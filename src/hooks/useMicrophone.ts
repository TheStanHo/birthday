import { useState, useEffect } from 'react';

interface UseMicrophoneReturn {
  stream: MediaStream | null;
  error: string | null;
  isAccessing: boolean;
  startMicrophone: () => Promise<void>;
  stopMicrophone: () => void;
}

/**
 * Hook to manage microphone access
 */
export function useMicrophone(): UseMicrophoneReturn {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAccessing, setIsAccessing] = useState(false);

  const startMicrophone = async () => {
    try {
      setIsAccessing(true);
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false, // Disable to better detect blowing sounds
          noiseSuppression: false, // Disable to better detect blowing sounds
          autoGainControl: false, // Disable to get raw audio levels
        },
      });
      
      setStream(mediaStream);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access microphone';
      setError(errorMessage);
      console.error('Microphone access error:', err);
    } finally {
      setIsAccessing(false);
    }
  };

  const stopMicrophone = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, [stream]);

  return {
    stream,
    error,
    isAccessing,
    startMicrophone,
    stopMicrophone,
  };
}

