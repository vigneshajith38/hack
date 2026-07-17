from enum import Enum

from pydantic import BaseModel, Field


class DetectionLabel(str, Enum):
    real = "real"
    synthetic = "synthetic"
    inconclusive = "inconclusive"


class DetectionResponse(BaseModel):
    label: DetectionLabel
    synthetic_probability: float = Field(ge=0, le=1)
    confidence: str
    duration_seconds: float = Field(gt=0)
    model_version: str


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_version: str
