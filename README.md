# Voice Clone Detector API

This standalone module accepts a WAV upload and calls the selected pretrained Hugging Face detector, returning a normalized real/synthetic prediction. By default it uses `Sara1708/deepfake-audio-detector`.

## Run locally

```powershell
cd voice-detector
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open `http://127.0.0.1:8000/docs` to test the API.

## API

`GET /health` reports the selected inference provider.

`POST /detect` accepts one multipart field named `audio`. This first version accepts WAV files between 2 and 60 seconds and no larger than 15 MB.

Example frontend call:

```js
const body = new FormData();
body.append("audio", selectedFile);
const response = await fetch("http://127.0.0.1:8000/detect", { method: "POST", body });
const result = await response.json();
```

## Pretrained model and replacement

The default model is hosted by Hugging Face. Your uploaded audio is sent to that provider during inference, so do not use it for sensitive recordings. Public Spaces can have queues, rate limits, or downtime. Set `HF_TOKEN` in your environment to authenticate; never put it in frontend code.

Later, replace the `VoiceCloneDetector.predict()` implementation in `app/detector.py` with your own local trained model. This keeps the `/detect` request and response contract unchanged.

## Run after this update

Run `pip install -r requirements.txt` again in the virtual environment, then restart Uvicorn. Test with a non-sensitive WAV clip.
