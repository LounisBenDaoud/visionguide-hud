export function ThermalDisplay({ data }) {
  if (!data) return null;

  // Determine color based on severity
  const getColorClasses = () => {
    switch (data.severity) {
      case 'Critical':
        return {
          bg: 'bg-red-900/80',
          border: 'border-red-500',
          text: 'text-red-400',
          glow: 'shadow-[0_0_30px_rgba(239,68,68,0.5)]',
        };
      case 'Warning':
        return {
          bg: 'bg-amber-900/80',
          border: 'border-amber-500',
          text: 'text-amber-400',
          glow: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',
        };
      default:
        return {
          bg: 'bg-green-900/80',
          border: 'border-green-500',
          text: 'text-green-400',
          glow: 'shadow-[0_0_30px_rgba(34,197,94,0.5)]',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`absolute top-4 left-1/2 -translate-x-1/2 ${colors.bg} ${colors.border} border-2 rounded-lg p-4 backdrop-blur-sm ${colors.glow}`}>
      <div className="flex items-center gap-6">
        {/* Hotspot Temperature - Big Digital Display */}
        <div className="text-center">
          <div className={`font-hud text-5xl tracking-wider ${colors.text} animate-pulse`}>
            {data.hotspot_temp}
          </div>
          <div className="text-white/60 text-xs font-hud tracking-widest mt-1">
            HOTSPOT
          </div>
        </div>

        {/* Divider */}
        <div className={`w-px h-16 ${colors.border}`} />

        {/* Ambient Temperature */}
        <div className="text-center">
          <div className="font-hud text-2xl text-hud-cyan">
            {data.ambient_temp}
          </div>
          <div className="text-white/60 text-xs font-hud tracking-widest mt-1">
            AMBIENT
          </div>
        </div>

        {/* Divider */}
        <div className={`w-px h-16 ${colors.border}`} />

        {/* Status */}
        <div className="text-center max-w-[200px]">
          <div className={`font-hud text-sm ${colors.text} leading-tight`}>
            {data.status}
          </div>
          <div className="text-white/60 text-xs font-hud tracking-widest mt-2">
            {data.severity}
          </div>
        </div>
      </div>
    </div>
  );
}
