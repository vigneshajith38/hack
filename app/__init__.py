"""Voice-clone detection API."""
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