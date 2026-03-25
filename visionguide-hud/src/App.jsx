import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraFeed } from './components/CameraFeed';
import { ScanLine } from './components/ScanLine';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { TargetBox } from './components/TargetBox';
import { ThermalOverlay } from './components/ThermalOverlay';
import { ThermalDisplay } from './components/ThermalDisplay';
import { ControlBar } from './components/ControlBar';
import { analyzeImage, getThermalStatus } from './api/visionguide';
import { FALLBACK_MOCK } from './data/mockDiagnostic';

export default function App() {
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null); // Store the captured/uploaded image
  const [thermalData, setThermalData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [thermalEnabled, setThermalEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const cameraRef = useRef(null);

  // Get severity-based color theme
  const getSeverityColor = () => {
    const severity = thermalData?.severity || diagnosticData?.severityLevel;
    if (severity === 'Critical') return 'red';
    if (severity === 'Warning') return 'amber';
    return 'green';
  };

  const severityColor = getSeverityColor();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'm' && !isProcessing) {
        triggerMock();
      }
      if (e.key.toLowerCase() === 't') {
        setThermalEnabled(prev => !prev);
      }
      if (e.key.toLowerCase() === 'c' && !isProcessing) {
        handleCapture();
      }
      // Press R to return to live camera
      if (e.key.toLowerCase() === 'r' && capturedImage) {
        clearCapture();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProcessing, capturedImage]);

  // Thermal polling - every 2 seconds when thermal mode is active
  useEffect(() => {
    if (!thermalEnabled) {
      setThermalData(null);
      return;
    }

    const fetchThermal = async () => {
      try {
        const data = await getThermalStatus();
        setThermalData(data);
      } catch (err) {
        console.error('Thermal fetch failed:', err);
      }
    };

    // Fetch immediately
    fetchThermal();

    // Poll every 2 seconds
    const interval = setInterval(fetchThermal, 2000);
    return () => clearInterval(interval);
  }, [thermalEnabled]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Clear captured image and return to live camera
  const clearCapture = useCallback(() => {
    setCapturedImage(null);
    setDiagnosticData(null);
    setIsScanning(true);
  }, []);

  const handleCapture = useCallback(async () => {
    setIsProcessing(true);
    setIsScanning(true);
    setError(null);

    try {
      // Capture image from camera
      const imageBase64 = cameraRef.current?.capture();

      if (!imageBase64) {
        throw new Error('Failed to capture image from camera');
      }

      // Store the captured image
      setCapturedImage(imageBase64);

      // Send to backend API
      const data = await analyzeImage(imageBase64);
      setDiagnosticData(data);
    } catch (err) {
      console.error('Diagnostic failed:', err);
      setError(err.message || 'Analysis failed');
      // Fallback to mock data on error
      setDiagnosticData(FALLBACK_MOCK);
    } finally {
      setIsProcessing(false);
      setIsScanning(false);
    }
  }, []);

  // Handle file upload analysis
  const handleFileAnalysis = useCallback((imageBase64, data) => {
    setCapturedImage(imageBase64);
    setDiagnosticData(data);
    setIsScanning(false);
  }, []);

  const triggerMock = useCallback(async () => {
    setIsProcessing(true);
    setIsScanning(true);
    setError(null);
    await new Promise(r => setTimeout(r, 1000));
    setDiagnosticData(FALLBACK_MOCK);
    setIsProcessing(false);
    setIsScanning(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden ${thermalEnabled ? 'thermal-active' : ''}`}
      data-severity={severityColor}
    >
      {/* Camera Background - hidden when showing captured image */}
      <div className={capturedImage ? 'hidden' : ''}>
        <CameraFeed ref={cameraRef} />
      </div>

      {/* Captured Image Display - shown after analysis */}
      {capturedImage && (
        <div className="fixed inset-0 bg-hud-dark">
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* HUD Frame - color changes based on severity */}
      <div className={`hud-frame hud-frame-${severityColor} absolute inset-0 pointer-events-none`}>
        <div className="crosshair" />
      </div>

      {/* Scan Line Animation */}
      <ScanLine isScanning={isScanning || isProcessing} />

      {/* Diagnostic Panel */}
      <DiagnosticPanel
        data={diagnosticData}
        isLoading={isProcessing}
        severityColor={severityColor}
      />

      {/* Target Box - AR marker showing fault location */}
      <TargetBox
        bounds={diagnosticData?.bounds}
        label={diagnosticData?.faultType}
        severityColor={severityColor}
      />

      {/* Thermal Overlay */}
      <ThermalOverlay
        hotspot={diagnosticData?.thermalHotspot}
        enabled={thermalEnabled}
        containerRef={containerRef}
      />

      {/* Thermal Display - shows when thermal mode is active */}
      {thermalEnabled && thermalData && (
        <ThermalDisplay data={thermalData} />
      )}

      {/* Control Bar */}
      <ControlBar
        onCapture={handleCapture}
        onThermalToggle={() => setThermalEnabled(prev => !prev)}
        onMockTrigger={triggerMock}
        onAnalysis={setDiagnosticData}
        onFileAnalysis={handleFileAnalysis}
        thermalEnabled={thermalEnabled}
        isProcessing={isProcessing}
      />

      {/* Return to Camera Button - shown when viewing captured image */}
      {capturedImage && !isProcessing && (
        <button
          onClick={clearCapture}
          className="absolute top-4 left-4 px-4 py-2 bg-hud-panel border border-hud-cyan/50 rounded-lg font-hud text-sm text-hud-cyan hover:bg-hud-cyan/20 transition-all"
        >
          ← BACK TO CAMERA (R)
        </button>
      )}

      {/* Error Toast */}
      {error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-lg font-hud text-sm animate-pulse">
          {error}
        </div>
      )}

      {/* Status Bar - shows model when detected */}
      <div className="absolute top-4 right-4 text-hud-cyan/60 font-hud text-xs space-y-1 text-right">
        <div>VISIONGUIDE AI v1.0</div>
        {diagnosticData?.model && (
          <div className="text-hud-green">
            SCANNING: <span className="text-white">{diagnosticData.model}</span>
          </div>
        )}
        <div>STATUS: <span className={`text-hud-${severityColor === 'red' ? 'orange' : 'green'}`}>
          {diagnosticData ? severityColor.toUpperCase() : 'READY'}
        </span></div>
        <div className="text-hud-cyan/40">
          {capturedImage ? 'R = Return to Camera' : 'C = Capture | M = Mock | T = Thermal'}
        </div>
      </div>
    </div>
  );
}
