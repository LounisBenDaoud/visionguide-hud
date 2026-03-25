export function ScanLine({ isScanning = true }) {
  if (!isScanning) return null;

  return (
    <div
      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-hud-cyan to-transparent animate-scan pointer-events-none"
      style={{
        boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
      }}
    />
  );
}
