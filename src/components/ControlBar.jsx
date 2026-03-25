export function ControlBar({
  onCapture,
  onThermalToggle,
  onMockTrigger,
  thermalEnabled,
  isProcessing
}) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
      {/* Capture Button */}
      <button
        onClick={onCapture}
        disabled={isProcessing}
        className={`
          px-8 py-3 rounded-full font-hud text-sm tracking-widest
          border-2 border-hud-cyan bg-hud-panel backdrop-blur-sm
          transition-all duration-200
          ${isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-hud-cyan/20 hover:shadow-[0_0_20px_#00ffff]'
          }
        `}
      >
        <span className="text-hud-cyan">
          {isProcessing ? 'ANALYZING...' : 'CAPTURE'}
        </span>
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
