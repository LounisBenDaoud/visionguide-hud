import { useRef, useEffect } from 'react';

export function ThermalOverlay({ hotspot, enabled, containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled || !hotspot || !canvasRef.current || !containerRef?.current) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate hotspot position in pixels
    const centerX = (hotspot.x / 100) * canvas.width;
    const centerY = (hotspot.y / 100) * canvas.height;
    const radius = (hotspot.radius / 100) * Math.min(canvas.width, canvas.height);

    // Create radial gradient (heat bloom)
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(255, 100, 0, 0.7)');
    gradient.addColorStop(0.3, 'rgba(255, 50, 0, 0.5)');
    gradient.addColorStop(0.6, 'rgba(200, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(100, 0, 0, 0)');

    // Draw heat bloom with blur effect
    ctx.filter = 'blur(20px)';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

  }, [hotspot, enabled, containerRef]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
    />
  );
}
