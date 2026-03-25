import { useRef, useState } from 'react';
import { analyzeImage } from '../api/visionguide';
import { FALLBACK_MOCK } from '../data/mockDiagnostic';

export function ControlBar({
  onCapture,
  onThermalToggle,
  onMockTrigger,
  onAnalysis,
  onFileAnalysis,
  thermalEnabled,
  isProcessing
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result;
        if (typeof base64String === 'string') {
          try {
            const data = await analyzeImage(base64String);
            // Pass both image and data to parent
            if (onFileAnalysis) {
              onFileAnalysis(base64String, data);
            } else {
              onAnalysis(data);
            }
          } catch (err) {
            console.error('Analysis error:', err);
            if (onFileAnalysis) {
              onFileAnalysis(base64String, FALLBACK_MOCK);
            } else {
              onAnalysis(FALLBACK_MOCK);
            }
          }
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File read error:', err);
      setIsUploading(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDisabled = isProcessing || isUploading;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
      {/* Capture Button */}
      <button
        onClick={onCapture}
        disabled={isDisabled}
        className={`
          px-8 py-3 rounded-full font-hud text-sm tracking-widest
          border-2 border-hud-cyan bg-hud-panel backdrop-blur-sm
          transition-all duration-200
          ${isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-hud-cyan/20 hover:shadow-[0_0_20px_#00ffff]'
          }
        `}
      >
        <span className="text-hud-cyan">
          {isProcessing ? 'ANALYZING...' : 'CAPTURE'}
        </span>
      </button>

      {/* Upload Image Button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        disabled={isDisabled}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isDisabled}
        className={`
          px-6 py-3 rounded-full font-hud text-sm tracking-widest
          border-2 border-hud-green/50 bg-hud-panel text-hud-green/70
          transition-all duration-200
          ${isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-hud-green hover:shadow-[0_0_15px_#39ff14]'
          }
        `}
      >
        {isUploading ? 'LOADING...' : 'UPLOAD'}
      </button>

      {/* Thermal Toggle */}
      <button
        onClick={onThermalToggle}
        className={`
          px-6 py-3 rounded-full font-hud text-sm tracking-widest
          border-2 transition-all duration-200
          ${thermalEnabled
            ? 'border-hud-orange bg-hud-orange/20 text-hud-orange shadow-[0_0_15px_#ff6b35]'
            : 'border-hud-cyan/50 bg-hud-panel text-hud-cyan/70 hover:border-hud-orange'
          }
        `}
      >
        THERMAL {thermalEnabled ? 'ON' : 'OFF'}
      </button>

      {/* Hidden Mock Trigger - Press 'M' or click */}
      <button
        onClick={onMockTrigger}
        className="opacity-0 hover:opacity-100 px-4 py-2 text-xs text-hud-cyan/50 border border-dashed border-hud-cyan/30 rounded transition-opacity"
        title="Press 'M' for mock data"
      >
        MOCK
      </button>
    </div>
  );
}
