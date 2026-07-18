"""
VoiceShield SDK Backend

A production-ready FastAPI starter backend that accepts audio uploads
and returns a dummy AI analysis response.

Python Version:
    3.11+

Author:
    VoiceShield SDK
"""

from pathlib import Path
import shutil

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse

# -------------------------------------------------------------------
# Load environment variables
# -------------------------------------------------------------------
load_dotenv()

# -------------------------------------------------------------------
# Application Configuration
# -------------------------------------------------------------------

APP_NAME = "VoiceShield SDK"

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".wav", ".mp3"}

app = FastAPI(
    title=APP_NAME,
    version="1.0.0",
    description="Backend API for VoiceShield SDK",
)


# -------------------------------------------------------------------
# Health Check Endpoint
# -------------------------------------------------------------------

@app.get("/health")
async def health():
    """
    Health check endpoint.

    Returns:
        JSON object indicating service status.
    """
    return {
        "status": "healthy",
        "service": APP_NAME
    }


# -------------------------------------------------------------------
# Audio Analysis Endpoint
# -------------------------------------------------------------------

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    """
    Upload an audio file and return a dummy analysis.

    Supported formats:
    - .wav
    - .mp3
    """

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only .wav and .mp3 files are supported."
        )

    destination = UPLOAD_DIR / file.filename

    # Save uploaded file
    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    response = {
        "risk_score": 87,
        "risk_level": "High",
        "transcript": "This is a placeholder transcript.",
        "voice_clone_probability": 0.32,
        "scam_indicators": [
            "Urgency",
            "Money request"
        ],
        "recommendation": "Verify the caller before sending money."
    }

    return JSONResponse(content=response)