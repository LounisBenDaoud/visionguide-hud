import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraFeed } from './components/CameraFeed';
import { ScanLine } from './components/ScanLine';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { TargetBox } from './components/TargetBox';
import { ThermalOverlay } from './components/ThermalOverlay';
import { ControlBar } from './components/ControlBar';
import { fetchMockDiagnostic, FALLBACK_MOCK } from './data/mockDiagnostic';

export default function App() {
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [thermalEnabled, setThermalEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const containerRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'm' && !isProcessing) {
        triggerMock();
      }
      if (e.key.toLowerCase() === 't') {
        setThermalEnabled(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProcessing]);

  const handleCapture = useCallback(async () => {
    setIsProcessing(true);
    setIsScanning(true);

    try {
      // In real implementation, send captured image to API
      // For now, use mock data
      const data = await fetchMockDiagnostic();
      setDiagnosticData(data);
    } catch (err) {
      console.error('Diagnostic failed:', err);
      setDiagnosticData(FALLBACK_MOCK);
    } finally {
      setIsProcessing(false);
      setIsScanning(false);
    }
  }, []);

  const triggerMock = useCallback(async () => {
    setIsProcessing(true);
    setIsScanning(true);
    await new Promise(r => setTimeout(r, 1000));
    setDiagnosticData(FALLBACK_MOCK);
    setIsProcessing(false);
    setIsScanning(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden ${thermalEnabled ? 'thermal-active' : ''}`}
    >
      {/* Camera Background */}
      <CameraFeed />

      {/* HUD Frame */}
      <div className="hud-frame absolute inset-0 pointer-events-none">
        <div className="crosshair" />
      </div>

      {/* Scan Line Animation */}
      <ScanLine isScanning={isScanning || isProcessing} />

      {/* Diagnostic Panel */}
      <DiagnosticPanel data={diagnosticData} isLoading={isProcessing} />

      {/* Target Box */}
      <TargetBox
        bounds={diagnosticData?.bounds}
        label={diagnosticData?.faultType}
      />

      {/* Thermal Overlay */}
      <ThermalOverlay
        hotspot={diagnosticData?.thermalHotspot}
        enabled={thermalEnabled}
        containerRef={containerRef}
      />

      {/* Control Bar */}
      <ControlBar
        onCapture={handleCapture}
        onThermalToggle={() => setThermalEnabled(prev => !prev)}
        onMockTrigger={triggerMock}
        thermalEnabled={thermalEnabled}
        isProcessing={isProcessing}
      />

      {/* Status Bar */}
      <div className="absolute top-4 right-4 text-hud-cyan/60 font-hud text-xs space-y-1 text-right">
        <div>VISIONGUIDE AI v1.0</div>
        <div>STATUS: <span className="text-hud-green">ONLINE</span></div>
        <div className="text-hud-cyan/40">Press M for mock | T for thermal</div>
      </div>
    </div>
  );
}
