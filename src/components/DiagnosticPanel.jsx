export function DiagnosticPanel({ data, isLoading }) {
  return (
    <div className="absolute left-4 top-4 bottom-20 w-80 bg-hud-panel border border-hud-cyan/30 rounded-lg p-4 backdrop-blur-sm overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-hud-cyan/30">
        <div className="w-2 h-2 rounded-full bg-hud-green animate-pulse" />
        <h2 className="text-hud-cyan font-hud text-lg tracking-wider">
          DIAGNOSTIC ANALYSIS
        </h2>
      </div>

      {isLoading ? (
        <div className="text-hud-cyan/60 animate-pulse font-hud">
          ANALYZING TARGET...
        </div>
      ) : data ? (
        <div className="space-y-4 text-sm">
          {/* Fault Type */}
          <div>
            <label className="text-hud-cyan/60 text-xs tracking-widest">
              FAULT DETECTED
            </label>
            <p className="text-hud-green font-hud text-lg">
              {data.faultType}
            </p>
          </div>

          {/* Severity */}
          <div>
            <label className="text-hud-cyan/60 text-xs tracking-widest">
              SEVERITY LEVEL
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-hud-dark rounded overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${data.severity > 70 ? 'bg-red-500' :
                      data.severity > 40 ? 'bg-hud-orange' : 'bg-hud-green'
                    }`}
                  style={{ width: `${data.severity}%` }}
                />
              </div>
              <span className="text-hud-orange font-hud">{data.severity}%</span>
            </div>
          </div>

          {/* Repair Steps */}
          <div>
            <label className="text-hud-cyan/60 text-xs tracking-widest">
              REPAIR PROTOCOL
            </label>
            <ol className="mt-2 space-y-2 text-white/90">
              {data.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-hud-cyan font-hud">{String(i + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Confidence */}
          <div className="pt-4 border-t border-hud-cyan/30">
            <span className="text-hud-cyan/60 text-xs">
              AI CONFIDENCE: <span className="text-hud-green">{data.confidence}%</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="text-hud-cyan/40 italic">
          Point camera at machinery and capture to analyze
        </div>
      )}
    </div>
  );
}
