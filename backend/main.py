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
import httpx

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
AI_SERVER = "http://127.0.0.1:8000"

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

    extension = Path(file.filename).suffix.lower()

    if extension != ".wav":
        raise HTTPException(
            status_code=400,
            detail="Only .wav files are supported."
        )

    audio_bytes = await file.read()

    async with httpx.AsyncClient(timeout=120) as client:

        response = await client.post(
            "http://127.0.0.1:8000/detect",
            files={
                "audio": (
                    file.filename,
                    audio_bytes,
                    file.content_type
                )
            }
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.text
        )

    return response.json()