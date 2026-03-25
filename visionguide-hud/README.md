# VisionGuide AI - AR Diagnostic HUD

A futuristic "Iron Man style" Heads-Up Display (HUD) interface for AR-based machine diagnostics. Built for hackathons - this is the frontend component that simulates augmented reality diagnostics with live camera feed, thermal imaging, and AI-powered repair guidance.

## What It Does

VisionGuide AI transforms any device with a camera into a smart diagnostic tool:

- **Live Camera Feed** - Full-screen webcam integration using WebRTC
- **Scanning Animation** - Futuristic horizontal scan line effect
- **Diagnostic Panel** - Displays AI-detected faults, severity levels, and step-by-step repair instructions
- **AR Target Box** - Highlights the fault location with a glowing bounding box
- **Thermal View** - Simulated thermal imaging with heat bloom effects
- **Mock Data Support** - Demo-ready with instant mock responses (no backend required)

## Tech Stack

- **Vite** - Lightning-fast dev server
- **React** - Component-based UI
- **Tailwind CSS v4** - Utility-first styling with custom HUD theme

## Quick Start

### Prerequisites
- Node.js 18+
- A device with a webcam
- Chrome or Edge browser (required for camera access)

### Installation

```bash
# Clone or navigate to the project
cd visionguide-hud

# Install dependencies
npm install

# Start development server
npm run dev
```

### Open in Browser

Navigate to `http://localhost:5173` (or the port shown in terminal)

**Important:** Allow camera permissions when prompted.

## How to Use

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
