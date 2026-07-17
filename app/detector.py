"""Adapters for the voice-clone inference provider."""
import torch
import librosa
from pathlib import Path
from dataclasses import dataclass

from transformers import (
    AutoFeatureExtractor,
    AutoModelForAudioClassification
)


class ModelNotReadyError(RuntimeError):
    pass


class ModelServiceError(RuntimeError):
    pass


@dataclass(frozen=True)
class Prediction:
    synthetic_probability: float
    model_version: str


class VoiceCloneDetector:

    MODEL_NAME = "MelodyMachine/Deepfake-audio-detection"

    def __init__(self):

        self.model_version = self.MODEL_NAME

        try:
            self.feature_extractor = AutoFeatureExtractor.from_pretrained(
                self.MODEL_NAME
            )

            self.model = AutoModelForAudioClassification.from_pretrained(
                self.MODEL_NAME
            )

            self.model.eval()

            print("Model loaded successfully")
            print("Labels:", self.model.config.id2label)

            self.loaded = True

        except Exception as error:
            self.loaded = False
            raise ModelServiceError(
                f"Could not load model: {error}"
            )


    def predict(self, audio_path: Path):

        try:
            # Load audio
            audio, sr = librosa.load(
                audio_path,
                sr=16000,
                mono=True
            )

            # Normalize audio
            audio = librosa.util.normalize(audio)


            # Convert audio to model input
            inputs = self.feature_extractor(
                audio,
                sampling_rate=16000,
                return_tensors="pt"
            )


            # Model inference
            with torch.no_grad():
                output = self.model(**inputs)

                probabilities = torch.softmax(
                    output.logits,
                    dim=-1
                )


            print("Model labels:", self.model.config.id2label)
            print("Probabilities:", probabilities)


            # Find synthetic/fake class automatically
            fake_index = None

            for index, label in self.model.config.id2label.items():

                label_name = label.lower()

                if (
                    "fake" in label_name
                    or "synthetic" in label_name
                    or "spoof" in label_name
                ):
                    fake_index = index
                    break


            if fake_index is None:
                raise ModelServiceError(
                    "Synthetic class not found in model labels"
                )


            synthetic_probability = probabilities[0][fake_index].item()


            return Prediction(
                synthetic_probability=synthetic_probability,
                model_version=self.model_version
            )


        except Exception as error:

            raise ModelServiceError(
                f"Prediction failed: {error}"
            )