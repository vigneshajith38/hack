from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_reports_model_state():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ready"
    assert response.json()["model_loaded"] is True


def test_detect_rejects_non_wav_upload():
    response = client.post("/detect", files={"audio": ("sample.mp3", b"not audio", "audio/mpeg")})

    assert response.status_code == 415
