
from pathlib import Path
import tempfile

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from gradio_client import Client, handle_file

load_dotenv()

APP_NAME = "VoiceShield SDK"

client = Client("Hariniiiiiiiiiii/Voiceshield_AI")

ALLOWED_EXTENSIONS = {
    ".wav",
    ".mp3",
    ".aac",
    ".mpeg",
    ".m4a",
    ".ogg",
}

app = FastAPI(
    title=APP_NAME,
    version="1.0.0",
    description="Backend API for VoiceShield SDK",
)


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": APP_NAME
    }


@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Supported formats: .wav, .mp3, .aac, .mpeg, .m4a, .ogg"
        )

    with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as temp:
        temp.write(await file.read())
        temp_path = temp.name

    try:
        result = client.predict(
            audio_path=handle_file(temp_path),
            api_name="/detect",
        )
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        Path(temp_path).unlink(missing_ok=True)