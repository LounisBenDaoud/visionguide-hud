export function TargetBox({ bounds, label, severityColor = 'amber' }) {
  if (!bounds) return null;

  const { x, y, width, height } = bounds;

  // Get colors based on severity
  const getColors = () => {
    switch (severityColor) {
      case 'red':
        return {
          border: 'border-red-500',
          shadow: '0 0 15px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(239, 68, 68, 0.1)',
          bg: 'bg-red-500/90',
          corner: 'border-red-300',
        };
      case 'amber':
        return {
          border: 'border-amber-500',
          shadow: '0 0 15px rgba(245, 158, 11, 0.6), inset 0 0 20px rgba(245, 158, 11, 0.1)',
          bg: 'bg-amber-500/90',
          corner: 'border-amber-300',
        };
      default:
        return {
          border: 'border-green-500',
          shadow: '0 0 15px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.1)',
          bg: 'bg-green-500/90',
          corner: 'border-green-300',
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`absolute border-2 ${colors.border} animate-pulse pointer-events-none`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        boxShadow: colors.shadow,
      }}
    >
      {/* Corner accents */}
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${colors.corner}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${colors.corner}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${colors.corner}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${colors.corner}`} />

      {/* Label */}
      {label && (
        <div className={`absolute -top-7 left-0 ${colors.bg} px-2 py-0.5 text-xs font-hud text-white whitespace-nowrap rounded-sm`}>
          {label}
        </div>
      )}
    </div>
  );
}
