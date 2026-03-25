import { useState, useRef } from 'react';
import { analyzeImage } from '../api/visionguide';
import { FALLBACK_MOCK } from '../data/mockDiagnostic';

export function FileUploadButton({ onAnalysis, isProcessing }) {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result;
        if (typeof base64String === 'string') {
          try {
            const data = await analyzeImage(base64String);
            onAnalysis(data);
          } catch (err) {
            console.error('Analysis error:', err);
            // Fallback to mock
            onAnalysis(FALLBACK_MOCK);
          }
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File read error:', err);
      setIsLoading(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isProcessing || isLoading}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing || isLoading}
        className={`
          px-6 py-3 rounded-full font-hud text-sm tracking-widest
          border-2 border-hud-cyan/30 bg-hud-panel text-hud-cyan/70
          transition-all duration-200 hover:border-hud-cyan
          ${isProcessing || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? 'LOADING...' : 'UPLOAD IMAGE'}
      </button>
    </>
  );
}
