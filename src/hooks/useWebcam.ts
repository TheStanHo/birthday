import { useState, useEffect, useRef } from 'react';

interface UseWebcamReturn {
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  error: string | null;
  isAccessing: boolean;
  startWebcam: () => Promise<void>;
  stopWebcam: () => void;
}

/**
 * Hook to manage webcam access
 */
export function useWebcam(): UseWebcamReturn {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAccessing, setIsAccessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startWebcam = async () => {
    try {
      setIsAccessing(true);
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Front-facing camera
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access webcam';
      setError(errorMessage);
      console.error('Webcam access error:', err);
    } finally {
      setIsAccessing(false);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stream]);

  return {
    stream,
    videoRef,
    error,
    isAccessing,
    startWebcam,
    stopWebcam,
  };
}

