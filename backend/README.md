# VisionGuide AI - Backend (FastAPI + Gemini)

This is the FastAPI server that powers the VisionGuide AI diagnostic system. It uses **Google Gemini 2.5 Flash** to analyze images of industrial equipment and provides intelligent fault detection with repair guidance.

## 🎯 Features

- **Image Analysis** - AI-powered fault detection using Gemini Vision
- **Real-time Processing** - Fast responses via Gemini 2.5 Flash model
- **RESTful API** - Clean, documented endpoints with Swagger UI
- **CORS Enabled** - Ready for cross-origin frontend requests
- **Error Handling** - Robust error management and logging

## 🛠️ Tech Stack

- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI web server
- **Google Gemini 2.5 Flash** - Multi-modal AI model
- **Python 3.8+** - Runtime

## 📦 Installation

### 1. Clone or Navigate to Backend

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
# Create venv
python -m venv venv

# Activate venv
# Windows:
.\venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Google API Key

Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

**Windows (PowerShell):**
```powershell
$env:GOOGLE_API_KEY="your-api-key-here"
```

**Windows (Command Prompt):**
```cmd
set GOOGLE_API_KEY=your-api-key-here
```

**Mac/Linux:**
```bash
export GOOGLE_API_KEY="your-api-key-here"
```

**Or create a `.env` file:**
```
GOOGLE_API_KEY=your-api-key-here
```

### 5. Run the Server

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Server will be available at: `http://localhost:8000`

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Endpoints

#### Health Check
```
GET /
```
Returns: `{"status": "ok"}`

#### Analyze Image
```
POST /analyze
Content-Type: application/json

{
  "image_base64": "base64-encoded-image-data"
}
```

**Response:**
```json
{
  "status": "success",
  "analysis": {
    "fault_detected": true,
    "fault_type": "Overheating CPU module",
    "severity": "high",
    "location": "Top-right corner",
    "repair_steps": [
      "Step 1: Power off the system",
      "Step 2: Remove the heat sink cover",
      "Step 3: Clean thermal paste residue",
      "Step 4: Apply new thermal paste",
      "Step 5: Reinstall heat sink and secure"
    ],
    "confidence": 0.95
  }
}
```

## 🧪 Testing

### Using Swagger UI

1. Open `http://localhost:8000/docs`
2. Click "Try it out" on the `/analyze` endpoint
3. Paste base64-encoded image data
4. Click Execute

### Using cURL

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAUA..."
  }'
```

### Using Python

```python
import requests
import base64

with open("image.jpg", "rb") as img_file:
    b64 = base64.b64encode(img_file.read()).decode()

response = requests.post(
    "http://localhost:8000/analyze",
    json={"image_base64": b64}
)
print(response.json())
```

### Test Script

Run the included test script:

```bash
python test_brain.py
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Your Google Gemini API key | Yes |
| `PORT` | Server port (default: 8000) | No |
| `HOST` | Server host (default: 0.0.0.0) | No |

## 📁 Project Structure

```
backend/
├── main.py              # FastAPI app, endpoints, AI logic
├── requirements.txt     # Python dependencies
├── test_brain.py       # Testing utilities
├── README.md           # This file
├── __pycache__/        # Python cache (auto-generated)
└── .env               # Environment variables (create manually)
```

## 🚀 Deployment

### Using ngrok (Expose to Internet)

```bash
# Install ngrok: https://ngrok.com/

ngrok http 8000
```

This will give you a public URL like `https://xxxx-xx-xxx-xxx-xx.ngrok.io`

Update your frontend `.env` to point to this URL:
```
VITE_API_URL=https://xxxx-xx-xxx-xxx-xx.ngrok.io
```

### Using Cloudflare Tunnel

```bash
# Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

cloudflared tunnel --url http://localhost:8000
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t visionguide-backend .
docker run -e GOOGLE_API_KEY="your-key" -p 8000:8000 visionguide-backend
```

## 🐛 Troubleshooting

### API Key Not Found

```
Error: GOOGLE_API_KEY environment variable not set
```

**Solution:** Set your API key before running:
```bash
export GOOGLE_API_KEY="your-key"  # Mac/Linux
$env:GOOGLE_API_KEY="your-key"    # Windows PowerShell
```

### Port Already in Use

```
Address already in use: 0.0.0.0:8000
```

**Solution:**
```bash
# Mac/Linux
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
# Find the PID, then:
taskkill /PID <PID> /F
```

### Gemini API Errors

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `403 Forbidden` | Invalid/exhausted API key | Check key in Google Cloud Console |
| `400 Bad Request` | Invalid image format | Ensure base64 is valid |
| `429 Too Many Requests` | Rate limited | Add request throttling |

### CORS Issues

If frontend gets CORS errors:

1. Verify backend CORS is enabled in `main.py`
2. Check frontend is accessing correct backend URL
3. Ensure ports are correct (8000 for backend, 5173 for frontend)

## 📖 Gemini API Reference

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vision Capabilities](https://ai.google.dev/tutorials/vision)

## 🔐 Security Notes

- **Never commit API keys** - Use `.env` files (add to `.gitignore`)
- **Rate limiting** - Consider adding rate limiting for production
- **Input validation** - Always validate base64 image data
- **HTTPS only** - Use HTTPS in production

## 📝 Development
