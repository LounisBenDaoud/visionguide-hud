import os
import json
import base64
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types
from fastapi.middleware.cors import CORSMiddleware
import random


from dotenv import load_dotenv
from google import genai
load_dotenv()

last_severity = "Healthy"
# 1. Initialize FastAPI
app = FastAPI(title="VisionGuide AI Brain")

# 2. Allow Frontend to talk to Backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Configure Gemini (2026 SDK)
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file!")
    
client = genai.Client(api_key=API_KEY)

MODEL_ID = "gemini-2.5-flash"

# 4. Define Request Schema
class AnalysisRequest(BaseModel):
    image_base64: str


# 5. System instruction kept separate for clarity
SYSTEM_INSTRUCTION = """
You are an industrial server rack fault detection system.
Analyze the provided image and identify the EXACT component with a non-green
(red or amber) status light.

Return ONLY a valid JSON object with this exact schema — no markdown,
no code fences, no extra text:
{
  "model": "Name of server model",
  "fault": "Short description of the error",
  "severity": "Critical | Warning",
  "steps": ["Step 1...", "Step 2...", "Step 3..."],
  "coordinates": {"x": <0-100>, "y": <0-100>}
}

Rules:
- "severity" must be exactly "Critical" (red light) or "Warning" (amber light).
- "steps" must contain exactly 3 actionable repair instructions.
- "coordinates" are normalized 0-100 representing the center of the fault.
"""


@app.post("/analyze")
async def analyze_image(request: AnalysisRequest):
    # --- Step A: Decode the base64 image into raw bytes ---
    try:
        image_bytes = base64.b64decode(request.image_base64)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid base64 string. Could not decode the image.",
        )

    # --- Step B: Build the multimodal content parts ---
    try:
        image_part = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")

        response = client.models.generate_content(
            model=MODEL_ID,
            contents=["Analyze this server rack image for faults.", image_part],
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                temperature=0.1,  # Low temp for deterministic diagnostics
            ),
        )
    except TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="Gemini API timed out. Please try again.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini API error: {e}",
        )

    # --- Step C: Parse and return the structured JSON ---
    try:
        result = json.loads(response.text)
    except (json.JSONDecodeError, TypeError):
        raise HTTPException(
            status_code=500,
            detail=f"Model returned non-JSON response: {response.text}",
        )

    global last_severity
    last_severity = result["severity"]
    return result

@app.get("/thermal-status")
async def get_thermal_data():
    global last_severity

    if last_severity == "Critical":
        temp = random.randint(75, 95)  # Dangerous heat
        status = "CRITICAL: Component Overheating"
    elif last_severity == "Warning":
        temp = random.randint(45, 60)  # Moderate heat
        status = "WARNING: Above Operating Temp"
    else:
        temp = random.randint(28, 35)  # Normal operating temp
        status = "System Nominal"

    return {
        "ambient_temp": "22°C",
        "hotspot_temp": f"{temp}°C",
        "status": status,
        "severity": last_severity
    }