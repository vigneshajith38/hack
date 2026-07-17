from pathlib import Path

import soundfile as sf


class AudioValidationError(ValueError):
    """Raised when an uploaded file is not suitable for inference."""


from .config import (
    SUPPORTED_SUFFIXES,
    MIN_DURATION_SECONDS,
    MAX_DURATION_SECONDS,
    MAX_FILE_SIZE_BYTES,
)


def validate_wav(path: Path) -> float:
    if path.suffix.lower() not in SUPPORTED_SUFFIXES:
        raise AudioValidationError("Only WAV audio is supported in this first version.")

    try:
        info = sf.info(path)
    except RuntimeError as error:
        raise AudioValidationError("The upload is not a readable WAV audio file.") from error

    duration = info.duration
    if duration < MIN_DURATION_SECONDS:
        raise AudioValidationError(f"Audio must be at least {MIN_DURATION_SECONDS:g} seconds long.")
    if duration > MAX_DURATION_SECONDS:
        raise AudioValidationError(f"Audio must be at most {MAX_DURATION_SECONDS:g} seconds long.")
    return round(float(duration), 3)
