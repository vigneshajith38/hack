from pathlib import Path
import librosa

class AudioValidationError(ValueError):
    """Raised when an uploaded file is not suitable for inference."""

from .config import (
    SUPPORTED_SUFFIXES,
    MIN_DURATION_SECONDS,
    MAX_DURATION_SECONDS,
    MAX_FILE_SIZE_BYTES,
)



def validate_audio(path: Path) -> float:
    if path.suffix.lower() not in SUPPORTED_SUFFIXES:
        raise AudioValidationError(
            "Supported formats: .wav, .mp3, .aac, .mpeg"
        )

    try:
        audio, sr = librosa.load(path, sr=16000, mono=True)
    except Exception as error:
        raise AudioValidationError(
            "The uploaded audio file could not be read."
        ) from error

    duration = len(audio) / sr

    if duration < MIN_DURATION_SECONDS:
        raise AudioValidationError(
            f"Audio must be at least {MIN_DURATION_SECONDS:g} seconds long."
        )

    if duration > MAX_DURATION_SECONDS:
        raise AudioValidationError(
            f"Audio must be at most {MAX_DURATION_SECONDS:g} seconds long."
        )

    return round(float(duration), 3)
