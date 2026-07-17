import os
import shutil
import tempfile
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware

from .audio import MAX_FILE_SIZE_BYTES, AudioValidationError, validate_wav
from .detector import ModelNotReadyError, ModelServiceError, VoiceCloneDetector
from .schemas import DetectionLabel, DetectionResponse, HealthResponse


from .config import ALLOWED_ORIGINS

origins = ALLOWED_ORIGINS
detector = VoiceCloneDetector()

app = FastAPI(title="Voice Clone Detector", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="ready" if detector.loaded else "model_not_configured",
        model_loaded=detector.loaded,
        model_version=detector.model_version,
    )


@app.post("/detect", response_model=DetectionResponse)
def detect(audio: UploadFile = File(...)) -> DetectionResponse:
    suffix = Path(audio.filename or "upload.wav").suffix.lower()
    if suffix != ".wav":
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Only .wav files are accepted.")

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temporary_file:
        temporary_path = Path(temporary_file.name)
        shutil.copyfileobj(audio.file, temporary_file, length=1024 * 1024)

    try:
        if temporary_path.stat().st_size > MAX_FILE_SIZE_BYTES:
            raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Audio file exceeds 15 MB.")
        duration = validate_wav(temporary_path)
        prediction = detector.predict(temporary_path)
    except AudioValidationError as error:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(error)) from error
    except ModelNotReadyError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error)) from error
    except ModelServiceError as error:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(error)) from error
    finally:
        temporary_path.unlink(missing_ok=True)
        audio.file.close()

    probability = prediction.synthetic_probability
    label = DetectionLabel.synthetic if probability >= 0.5 else DetectionLabel.real
    confidence = "high" if abs(probability - 0.5) >= 0.35 else "low"
    return DetectionResponse(
        label=label,
        synthetic_probability=round(probability, 4),
        confidence=confidence,
        duration_seconds=duration,
        model_version=prediction.model_version,
    )
