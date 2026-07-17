from pathlib import Path

import soundfile as sf


class AudioValidationError(ValueError):
    """Raised when an uploaded file is not suitable for inference."""


SUPPORTED_SUFFIXES = {".wav"}
MIN_DURATION_SECONDS = 2.0
MAX_DURATION_SECONDS = 60.0
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024


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
