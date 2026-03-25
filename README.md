# VisionGuide AI - Expert Mechanic

A futuristic "Iron Man style" Heads-Up Display (HUD) interface for AR-based machine diagnostics using Google Gemini AI. This full-stack project combines a React frontend with a FastAPI backend for real-time diagnostic analysis.

## 🎯 Project Overview

VisionGuide AI transforms any device with a camera into a smart diagnostic tool for industrial equipment:

- **Live Camera Feed** - Full-screen webcam integration with real-time capture
- **AI-Powered Analysis** - Google Gemini 2.5 Flash analyzes images for faults
- **Scanning Animation** - Futuristic horizontal scan line effect
- **Diagnostic Panel** - Displays detected issues, severity levels, and step-by-step repair instructions
- **AR Target Box** - Highlights fault locations with glowing bounding boxes
- **Thermal View** - Simulated thermal imaging with heat bloom effects
- **Mock Data Support** - Demo mode available without backend requirements

## 📋 Project Structure

```
Expert Mechanic/
├── backend/                    # FastAPI server with Gemini integration
│   ├── main.py                # API endpoints and AI inference
│   ├── requirements.txt        # Python dependencies
│   ├── test_brain.py          # Gemini AI testing utilities
│   └── README.md              # Backend documentation
│
├── visionguide-hud/           # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── data/              # Mock data for testing
│   │   └── api/               # API client
│   ├── package.json
│   └── README.md              # Frontend documentation
│
└── README.md                  # This file
```

## 🛠️ Tech Stack

**Frontend:**
- **Vite** - Lightning-fast build tool and dev server
- **React** - Component-based UI framework
- **Tailwind CSS v4** - Utility-first styling with custom HUD theme

**Backend:**
- **FastAPI** - Modern, fast Python web framework
- **Google Gemini 2.5 Flash** - Multi-modal AI for image analysis
- **Uvicorn** - ASGI server

## 📦 Prerequisites

Before starting, ensure you have:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)
- **Google API Key** - For Gemini AI access
- **Webcam** - Chrome or Edge browser required for camera access

## 🚀 Quick Start

### Step 1: Clone or Setup

```bash
cd Expert\ Mechanic
```

### Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set your Gemini API key
# Windows (PowerShell):
$env:GOOGLE_API_KEY="your-api-key-here"
# Mac/Linux:
export GOOGLE_API_KEY="your-api-key-here"

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`
- API docs: `http://localhost:8000/docs`

### Step 3: Setup Frontend (In a new terminal)

```bash
cd visionguide-hud

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Step 4: Access the Application

1. Open your browser to `http://localhost:5173`
2. **Allow camera permissions** when prompted
3. The app will connect to your backend at `http://localhost:8000`

## 🎮 How to Use

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `M` | Trigger mock diagnostic data (instant demo, no backend needed) |
| `T` | Toggle thermal view on/off |
| `CAPTURE` | Analyze current camera view using AI backend |

### UI Controls

- **CAPTURE** - Sends camera frame to AI for analysis
- **THERMAL ON/OFF** - Toggle thermal imaging effect
- **MOCK** - Use mock response data for testing

### Demo Workflow

1. Allow camera access when prompted
2. Point camera at an object
3. Press `M` or click **CAPTURE** to analyze
4. View the diagnostic results:
   - Fault description in left panel
   - Target box highlighting the issue
   - Repair instructions below
5. Press `T` to see thermal view
6. Press `M` repeatedly to see different mock scenarios

## 🔌 API Endpoints

### Backend (FastAPI)

- `GET /` - Health check
- `POST /analyze` - Analyze image for faults
  - Accepts base64-encoded image
  - Returns diagnostic data with AI analysis
- `GET /docs` - Interactive API documentation (Swagger UI)

## 🧪 Testing

### Test Mock Data

Press `M` key to load mock diagnostic data without needing a backend.

### Test Backend Connection

Visit `http://localhost:8000/docs` to test API endpoints directly from Swagger UI.

## 🐛 Troubleshooting

### Camera Not Working

- Ensure you're using **Chrome, Edge, or Safari** (Firefox has WebRTC limitations)
- Check browser camera permissions in settings
- Reload the page if permissions were denied initially

### Backend Connection Errors

If you see "Cannot connect to server" in the console:

1. Verify backend is running: `http://localhost:8000` should load
2. Check CORS settings in `backend/main.py`
3. Ensure frontend API URL matches backend port
4. Check firewall settings

### API Key Issues

If you get Gemini API errors:

1. Verify API key is set: `echo $GOOGLE_API_KEY` (Mac/Linux) or `$env:GOOGLE_API_KEY` (Windows)
2. Ensure API key is valid and has necessary permissions
3. Check Gemini API quota in Google Cloud Console

### Port Already in Use

```bash
# Kill process using port 8000 (backend)
lsof -ti:8000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :8000   # Windows - find PID then taskkill /PID xxx

# Kill process using port 5173 (frontend)
lsof -ti:5173 | xargs kill -9  # Mac/Linux
```

## 🌐 Deployment

### Using ngrok for Remote Access

To expose your local server to the internet:

```bash
# Install ngrok: https://ngrok.com/

# Expose backend
ngrok http 8000

# Expose frontend
ngrok http 5173
```

### Using Cloudflare Tunnel

```bash
# Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

cloudflared tunnel --url http://localhost:5173
cloudflared tunnel --url http://localhost:8000
```

## 📚 Documentation

- **Frontend Details** - See [visionguide-hud/README.md](visionguide-hud/README.md)
- **Backend Details** - See [backend/README.md](backend/README.md)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test locally
3. Commit and push: `git commit -am "Add feature"` → `git push origin feature/your-feature`
4. Open a pull request

## 📝 Notes

- **Mock Mode** - The app works without a backend! Press `M` for instant mock data
- **CORS** - Frontend and backend must run on localhost for development
- **Browser Support** - Requires modern browser with WebRTC support (Chrome, Edge 79+, Safari 11+)

## 🎓 How to Use

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `M` | Trigger mock diagnostic data (instant demo) |
| `T` | Toggle thermal view on/off |

### UI Controls

- **CAPTURE** - Analyze current camera view (uses mock data)
- **THERMAL ON/OFF** - Toggle thermal imaging effect
- Hidden **MOCK** button (hover to reveal) - Backup demo trigger

## Testing the Demo

1. Run `npm run dev` and open the app in Chrome/Edge
2. Allow camera permissions
3. You should see:
   - Live camera feed as background
   - Corner brackets and crosshair overlay
   - Animated scan line moving up/down
   - Diagnostic panel on the left (empty initially)
   - Control buttons at the bottom

4. Press `M` or click **CAPTURE** to simulate a diagnostic:
   - Diagnostic panel populates with fault info
   - Orange target box appears on screen
   - Repair steps are displayed

5. Press `T` to toggle thermal view:
   - Screen applies thermal color filter
   - Heat bloom appears at fault location

## Project Structure

```
visionguide-hud/
├── public/
│   └── mock_response.json      # Sample diagnostic data
├── src/
│   ├── components/
│   │   ├── CameraFeed.jsx      # Webcam integration
│   │   ├── ScanLine.jsx        # Animated scan effect
│   │   ├── DiagnosticPanel.jsx # AI results display
│   │   ├── TargetBox.jsx       # AR bounding box
│   │   ├── ThermalOverlay.jsx  # Heat bloom canvas
│   │   └── ControlBar.jsx      # UI buttons
│   ├── hooks/
│   │   └── useCamera.js        # getUserMedia hook
│   ├── data/
│   │   └── mockDiagnostic.js   # Mock API functions
│   ├── App.jsx                 # Main app component
│   └── index.css               # Tailwind + HUD styles
├── tailwind.config.js          # Custom theme config
├── postcss.config.js           # PostCSS setup
└── vercel.json                 # Deployment config
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite - just click Deploy

**Note:** Camera access requires HTTPS, which Vercel provides automatically.

### Manual Build

```bash
npm run build
# Output in /dist folder
```

## Customization

### Mock Data

Edit `public/mock_response.json` to change the demo diagnostic:

```json
{
  "faultType": "YOUR FAULT NAME",
  "severity": 75,
  "confidence": 90,
  "steps": ["Step 1", "Step 2", "Step 3"],
  "bounds": { "x": 35, "y": 25, "width": 30, "height": 35 },
  "thermalHotspot": { "x": 50, "y": 42, "radius": 18 }
}
```

### Theme Colors

Custom colors are defined in `src/index.css`:

- `--color-hud-cyan` - Primary accent (#00ffff)
- `--color-hud-green` - Success indicators (#39ff14)
- `--color-hud-orange` - Warnings/faults (#ff6b35)
- `--color-hud-dark` - Background (#0a0a0f)

## Integration with Backend

When Person 1's API is ready, update the `handleCapture` function in `src/App.jsx`:

```javascript
const handleCapture = async () => {
  const imageData = /* capture from camera */;

  const response = await fetch('YOUR_API_URL/diagnose', {
    method: 'POST',
    body: JSON.stringify({ image: imageData })
  });

  const data = await response.json();
  setDiagnosticData(data);
};
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Camera not working | Use Chrome/Edge, check permissions in browser settings |
| Black screen | Ensure no other app is using the camera |
| Styles not loading | Restart dev server after config changes |
| Port in use | Vite auto-selects next available port |

## License

MIT - Built for hackathon demonstration purposes.
