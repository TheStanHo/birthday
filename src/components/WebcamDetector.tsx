import { useEffect } from 'react';
import { useMicrophone } from '../hooks/useMicrophone';
import { useBlowDetection } from '../hooks/useBlowDetection';

interface WebcamDetectorProps {
  onBlowDetected: () => void;
  isActive: boolean;
}

export default function WebcamDetector({ onBlowDetected, isActive }: WebcamDetectorProps) {
  const { error, isAccessing, startMicrophone, stopMicrophone, stream } = useMicrophone();
  const { isDetecting, blowIntensity } = useBlowDetection({
    stream,
    onBlowDetected,
  });

  useEffect(() => {
    if (isActive) {
      startMicrophone();
    } else {
      stopMicrophone();
    }

    return () => {
      stopMicrophone();
    };
  }, [isActive]);

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-medium">Microphone Access Error</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
        <p className="text-xs text-gray-600 mt-2">
          Please allow microphone access to blow out the candles!
        </p>
      </div>
    );
  }

  if (isAccessing) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Requesting microphone access...</p>
      </div>
    );
  }

  if (!isActive || !stream) {
    return null;
  }

  return (
    <div className="relative">
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 mb-2">🎤 Blow into your microphone to extinguish the candles!</p>
        {isDetecting && (
          <>
            <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-150"
                style={{ width: `${Math.min(100, Math.max(1, blowIntensity))}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Blow intensity: {Math.round(blowIntensity)}%</p>
          </>
        )}
        {!isDetecting && (
          <p className="text-xs text-gray-400 mt-1">Waiting for microphone...</p>
        )}
      </div>
    </div>
  );
}

