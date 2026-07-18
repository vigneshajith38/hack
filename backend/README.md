# VoiceShield SDK Backend

A FastAPI backend for the VoiceShield SDK.

---

## Requirements

- Python 3.11+
- pip

---

## Installation

Clone the repository and navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Copy the example file.

```bash
cp .env.example .env
```

On Windows:

```powershell
copy .env.example .env
```

---

## Run the Server

```bash
uvicorn main:app --reload
```

The API will start at:

```
http://127.0.0.1:8000
```

Interactive documentation:

```
http://127.0.0.1:8000/docs
```

Alternative documentation:

```
http://127.0.0.1:8000/redoc
```

---

## Endpoints

### GET /health

Returns:

```json
{
  "status": "healthy",
  "service": "VoiceShield SDK"
}
```

---

### POST /analyze

Upload:

- `.wav`
- `.mp3`

Example using curl:

```bash
curl -X POST \
  "http://127.0.0.1:8000/analyze" \
  -F "file=@sample.wav"
```

Example Response:

```json
{
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
```

---

## Project Structure

```
backend/
│── main.py
│── requirements.txt
│── README.md
│── .env.example
│── uploads/
```

---

## Notes

- Uploaded files are stored in the `uploads/` directory.
- Only `.wav` and `.mp3` files are accepted.
- This version returns a dummy analysis response.
- AI model integration can be added later without changing the API contract.