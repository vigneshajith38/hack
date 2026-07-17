import os

# Audio settings
SUPPORTED_SUFFIXES = {".wav"}

MIN_DURATION_SECONDS = float(os.getenv("MIN_DURATION_SECONDS", "2"))
MAX_DURATION_SECONDS = float(os.getenv("MAX_DURATION_SECONDS", "60"))

MAX_FILE_SIZE_BYTES = int(
    os.getenv("MAX_FILE_SIZE_BYTES", str(15 * 1024 * 1024))
)

# AI Model settings
DETECTOR_PROVIDER = os.getenv("DETECTOR_PROVIDER", "huggingface_space")
HF_SPACE_ID = os.getenv("HF_SPACE_ID", "Sara1708/deepfake-audio-detector")
HF_TOKEN = os.getenv("HF_TOKEN")

# API settings
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000"
    ).split(",")
]