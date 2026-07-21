# VoiceShield SDK

AI-powered voice cloning detection and scam prevention for developers.

VoiceShield SDK provides a simple API that developers can integrate into voice applications to detect suspicious voice cloning and flag potential deepfake or scam activity in real time.

##features 
i) deepfake audio detection - Analyzes uploaded audio to determine whether it's real or synthetic.
ii) Simple REST API - Easy integration into any voice application.
iii) Scam prevention - Helps flag suspicious voice activity before it causes harm.

## Development tools and AI usage 
Codex
This project was built with the help of AI-assisted development tools throughout the design, coding, and debugging process.
-Generated the initial FastAPI backend structure.
-Assisted in creating API endpoints and request/response handling.
-Helped debug deployment issues on Render.
-Improved code organization and documentation.
-Assisted in writing utility functions for audio processing and validation.
-Generated the initial frontend structure, later enhanced with GPT-5.6.

GPT-5.6
-Designed the overall system architecture for the SDK.
-Suggested improvements to the backend workflow.
-Helped integrate the Hugging Face deepfake audio detection model.
-Assisted with debugging dependency and deployment errors.
-Generated documentation, API explanations, and project descriptions.
-Helped optimize the model inference pipeline for limited-memory environments.
-Supported integration between the frontend, backend, and AI components.

## Tech Stack

Backend - 	FastAPI, Python
AI Model - Hugging Face Deepfake Audio Detection Model
Deployment - Render
Frontend - HTML / CSS / JavaScript
Version - Control	GitHub
Editor - VS Code

## Project structure 

## Project Structure

```text
VoiceShield-SDK/
│
├── README.md
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   │
│   ├── core/
│   ├── services/
│   └── models/
│
├── tests/
│
├── frontend/
│
├── docs/
│
└── .gitignore
```
              

## How it works

1. **Upload**  
   User uploads an audio file through the VoiceShield API.

2. **Validate**  
   The backend validates the audio format, duration, and prepares it for analysis.

3. **Analyze**  
   The AI model processes audio features and detects patterns associated with synthetic or cloned voices.

4. **Respond**  
   The API returns the detection result, including:
   - Classification (real/synthetic)
   - Synthetic probability score
   - Confidence level
  
Example API Response
{
  "label": "synthetic",
  "synthetic_probability": 0.9999,
  "confidence": "high"
}

## Team development 


Our team of three collaborated to build **VoiceShield SDK** by dividing responsibilities across different layers of the application stack.

### Backend Development
- Designed and implemented the **FastAPI backend architecture**
- Developed API endpoints for audio analysis and processing
- Managed audio file handling and backend deployment

### Frontend Development
- Built the user-facing interface for interacting with the detection system
- Integrated frontend workflows with backend APIs
- Focused on creating an intuitive and seamless user experience

### AI Integration
- Integrated the **Hugging Face deepfake audio detection model**
- Developed the AI inference pipeline for audio classification
- Tested and optimized model performance for accurate detection

The team followed a collaborative development workflow using **GitHub for version control**, enabling parallel development, efficient code management, and seamless integration of different components.
