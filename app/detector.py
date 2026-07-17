"""Adapters for the voice-clone inference provider."""
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .config import DETECTOR_PROVIDER, HF_SPACE_ID, HF_TOKEN


class ModelNotReadyError(RuntimeError):
    pass


class ModelServiceError(RuntimeError):
    pass


@dataclass(frozen=True)
class Prediction:
    synthetic_probability: float
    model_version: str


class VoiceCloneDetector:
    """Calls the selected pretrained detector without changing the public API."""

    def __init__(self) -> None:
        self.provider = DETECTOR_PROVIDER
        self.space_id = HF_SPACE_ID
        self.token = HF_TOKEN or None
        self._client: Any = None
        self.loaded = self.provider == "huggingface_space"
        self.model_version = (
            f"hf-space:{self.space_id}"
            if self.loaded
            else "unconfigured"
        )

    def _get_client(self) -> Any:
        if self._client is not None:
            return self._client

        try:
            from gradio_client import Client

            if self.token:
                self._client = Client(self.space_id, hf_token=self.token)
            else:
                self._client = Client(self.space_id)

            return self._client

        except Exception as error:
            raise ModelServiceError(
                "Could not connect to the pretrained Hugging Face model. "
                "Check internet access, HF_SPACE_ID, and any HF_TOKEN. "
                f"Provider error: {type(error).__name__}: {error}"
            ) from error

    @staticmethod
    def _find_probability(value: Any) -> float | None:
        if isinstance(value, str):
            try:
                return VoiceCloneDetector._find_probability(json.loads(value))
            except json.JSONDecodeError:
                return None

        if isinstance(value, dict):
            for key, item in value.items():
                if key.lower() in {
                    "spoof_probability",
                    "synthetic_probability",
                    "fake_probability",
                }:
                    try:
                        probability = float(item)
                    except (TypeError, ValueError):
                        continue

                    if 0 <= probability <= 1:
                        return probability

                nested = VoiceCloneDetector._find_probability(item)
                if nested is not None:
                    return nested

        if isinstance(value, (list, tuple)):
            for item in value:
                nested = VoiceCloneDetector._find_probability(item)
                if nested is not None:
                    return nested

        return None

    def predict(self, audio_path: Path) -> Prediction:
        if not self.loaded:
            raise ModelNotReadyError("No inference provider has been configured.")

        try:
            from gradio_client import handle_file

            result = self._get_client().predict(
                upload_path=handle_file(str(audio_path)),
                record_path=None,
                api_name="/predict_audio_router",
            )

        except ModelServiceError:
            raise

        except Exception as error:
            raise ModelServiceError(
                "The pretrained model could not process this audio. "
                f"Provider error: {type(error).__name__}: {error}"
            ) from error

        probability = self._find_probability(result)

        if probability is None:
            raise ModelServiceError(
                "The pretrained model returned an unexpected response format. "
                "Its API may have changed."
            )

        return Prediction(
            synthetic_probability=probability,
            model_version=self.model_version,
        )
