"""
VoiceShield SDK Backend

A production-ready FastAPI starter backend that accepts audio uploads
and returns a dummy AI analysis response.
py -m uvicorn app.main:app --reload --port 8000
Python Version:
    3.11+

Author:
    VoiceShield SDK
"""

from pathlib import Path
import httpx

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile

# -------------------------------------------------------------------
# Load environment variables
# -------------------------------------------------------------------
load_dotenv()

# -------------------------------------------------------------------
# Application Configuration
# -------------------------------------------------------------------

APP_NAME = "VoiceShield SDK"
AI_SERVER = "http://127.0.0.1:8000"

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

# -------------------------------------------------------------------
# Health Check Endpoint
# -------------------------------------------------------------------

@app.get("/health")
async def health():
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

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Supported formats: .wav, .mp3, .aac, .mpeg, .m4a"
        )

    audio_bytes = await file.read()

    async with httpx.AsyncClient(timeout=120) as client:

        response = await client.post(
            f"{AI_SERVER}/detect",
            files={
                "audio": (
                    file.filename,
                    audio_bytes,
                    file.content_type,
                )
            },
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    return response.json()