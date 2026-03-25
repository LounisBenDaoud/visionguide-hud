export function TargetBox({ bounds, label }) {
  if (!bounds) return null;

  const { x, y, width, height } = bounds;

  return (
    <div
      className="absolute border-2 border-hud-orange animate-pulse-glow pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        boxShadow: '0 0 10px #ff6b35, inset 0 0 20px rgba(255, 107, 53, 0.1)',
      }}
    >
      {/* Corner accents */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-hud-cyan" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-hud-cyan" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-hud-cyan" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-hud-cyan" />

      {/* Label */}
      {label && (
        <div className="absolute -top-6 left-0 bg-hud-orange/90 px-2 py-0.5 text-xs font-hud text-white whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
}
