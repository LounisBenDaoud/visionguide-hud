import { useCamera } from '../hooks/useCamera';

export function CameraFeed() {
  const { videoRef, canvasRef, error } = useCamera();

  return (
    <div className="fixed inset-0 bg-hud-dark">
      {error ? (
        <div className="flex items-center justify-center h-full text-hud-orange text-xl font-hud">
          {error} - Please allow camera access
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  );
}
