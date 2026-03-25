export function DiagnosticPanel({ data, isLoading, severityColor = 'green' }) {
  // Get border color based on severity
  const getBorderColor = () => {
    switch (severityColor) {
      case 'red': return 'border-red-500/50';
      case 'amber': return 'border-amber-500/50';
      default: return 'border-hud-cyan/30';
    }
  };

  const getSeverityTextColor = () => {
    switch (severityColor) {
      case 'red': return 'text-red-400';
      case 'amber': return 'text-amber-400';
      default: return 'text-hud-green';
    }
  };

  return (
    <div className={`absolute left-4 top-4 bottom-20 w-80 bg-hud-panel border ${getBorderColor()} rounded-lg p-4 backdrop-blur-sm overflow-y-auto`}>
      {/* Header */}
      <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${getBorderColor()}`}>
        <div className={`w-2 h-2 rounded-full ${getSeverityTextColor()} animate-pulse`} style={{ backgroundColor: 'currentColor' }} />
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
          {/* Model - if available */}
          {data.model && (
            <div>
              <label className="text-hud-cyan/60 text-xs tracking-widest">
                EQUIPMENT MODEL
              </label>
              <p className="text-white font-hud text-base mt-1">
                {data.model}
              </p>
            </div>
          )}

          {/* Issue Detected (was Fault Type) */}
          <div>
            <label className="text-hud-cyan/60 text-xs tracking-widest">
              ISSUE DETECTED
            </label>
            <p className={`${getSeverityTextColor()} font-hud text-lg`}>
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
                  className={`h-full transition-all duration-500 ${
                    data.severity > 70 ? 'bg-red-500' :
                    data.severity > 40 ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${data.severity}%` }}
                />
              </div>
              <span className={`font-hud ${getSeverityTextColor()}`}>
                {data.severityLevel || (data.severity > 70 ? 'CRITICAL' : data.severity > 40 ? 'WARNING' : 'HEALTHY')}
              </span>
            </div>
          </div>

          {/* Repair Checklist (was Repair Protocol) */}
          <div>
            <label className="text-hud-cyan/60 text-xs tracking-widest">
              REPAIR CHECKLIST
            </label>
            <ol className="mt-2 space-y-2 text-white/90">
              {data.steps.map((step, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className={`${getSeverityTextColor()} font-hud flex-shrink-0`}>
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <span className="leading-tight">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Confidence */}
          <div className={`pt-4 border-t ${getBorderColor()}`}>
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
