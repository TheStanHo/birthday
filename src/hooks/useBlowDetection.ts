import { useState, useEffect, useRef } from 'react';

interface UseBlowDetectionProps {
  stream: MediaStream | null;
  onBlowDetected: () => void;
}

interface UseBlowDetectionReturn {
  isDetecting: boolean;
  blowIntensity: number;
}

/**
 * Hook to detect blowing using microphone audio levels
 * Uses Web Audio API to analyze audio volume and detect blowing sounds
 */
export function useBlowDetection({
  stream,
  onBlowDetected,
}: UseBlowDetectionProps): UseBlowDetectionReturn {
  const [isDetecting, setIsDetecting] = useState(false);
  const [blowIntensity, setBlowIntensity] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const smoothedIntensityRef = useRef<number>(0);
  const baselineRef = useRef<number | null>(null);
  const blowThreshold = 50; // Audio level threshold (0-100) - increased for mobile devices
  const consecutiveSamplesRequired = 5; // Number of consecutive samples with high volume - increased for less sensitivity
  const consecutiveSamplesRef = useRef(0);

  useEffect(() => {
    if (!stream) {
      setIsDetecting(false);
      return;
    }

    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048; // Higher FFT size for better resolution
      analyser.smoothingTimeConstant = 0.6; // Higher smoothing to reduce sensitivity to quick spikes
      analyserRef.current = analyser;

      // Create microphone source
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Create data array for audio analysis
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      setIsDetecting(true);
      
      // Calibrate baseline (ambient noise) after a short delay
      let calibrationSamples = 0;
      let baselineSum = 0;
      const calibrationDuration = 60; // Sample for ~1 second at 60fps

      const analyzeAudio = () => {
        if (!analyserRef.current || !dataArrayRef.current) {
          return;
        }

        // Use time domain data for better volume detection (blowing is amplitude-based, not frequency-based)
        if (dataArrayRef.current) {
          // @ts-expect-error - Web Audio API type compatibility issue
          analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
        }
        
        // Calculate RMS (Root Mean Square) for accurate volume measurement
        const dataArray: Uint8Array = dataArrayRef.current;
        let sumSquares = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
          // Convert byte (0-255) to normalized value (-1 to 1)
          const normalized = (dataArray[i] - 128) / 128;
          sumSquares += normalized * normalized;
        }
        
        // Calculate RMS
        const rms = Math.sqrt(sumSquares / dataArray.length);
        
        // Calibrate baseline during first second
        if (baselineRef.current === null && calibrationSamples < calibrationDuration) {
          baselineSum += rms;
          calibrationSamples++;
          if (calibrationSamples === calibrationDuration) {
            const averageBaseline = baselineSum / calibrationDuration;
            // Set baseline at average - we'll use a threshold approach instead
            baselineRef.current = averageBaseline;
            console.log('Baseline calibrated:', averageBaseline);
          }
          // Show 0 during calibration
          setBlowIntensity(0);
          animationFrameRef.current = requestAnimationFrame(analyzeAudio);
          return;
        }
        
        // Calculate relative volume - use subtraction with threshold
        const baseline = baselineRef.current || 0.001;
        // Subtract baseline and only show positive values
        const relativeVolume = Math.max(0, rms - baseline);
        
        // Convert to percentage (0-100) with better scaling
        // Use a threshold - only show intensity if significantly above baseline
        // RMS values for blowing are typically 0.01-0.05 above baseline
        // Increased threshold for mobile devices (they tend to be more sensitive)
        const threshold = baseline * 0.2; // 20% above baseline is considered "blowing" (increased from 15%)
        let rawVolume = 0;
        
        if (relativeVolume >= threshold) {
          // Above threshold - calculate intensity
          // Scale based on how much above threshold (0-100%)
          // Reduced maxExcess for less sensitivity on mobile
          const excessVolume = relativeVolume - threshold;
          const maxExcess = baseline * 0.5; // 50% above baseline is max (increased threshold range)
          rawVolume = Math.min(100, (excessVolume / maxExcess) * 100);
        }
        
        // Smooth the intensity value to prevent instant jumps
        const smoothingFactorUp = 0.2; // When increasing (blowing)
        const smoothingFactorDown = 0.15; // When decreasing (not blowing)
        
        if (rawVolume > smoothedIntensityRef.current) {
          // Increasing - use moderate smoothing
          smoothedIntensityRef.current = smoothedIntensityRef.current * (1 - smoothingFactorUp) + rawVolume * smoothingFactorUp;
        } else {
          // Decreasing - decay towards 0
          smoothedIntensityRef.current = smoothedIntensityRef.current * (1 - smoothingFactorDown) + rawVolume * smoothingFactorDown;
        }
        
        // Ensure it stays within bounds
        smoothedIntensityRef.current = Math.max(0, Math.min(100, smoothedIntensityRef.current));
        
        const normalizedVolume = Math.round(smoothedIntensityRef.current);
        setBlowIntensity(normalizedVolume);

        // Check if volume exceeds threshold (blowing detected)
        if (normalizedVolume > blowThreshold) {
          consecutiveSamplesRef.current++;
          
          if (consecutiveSamplesRef.current >= consecutiveSamplesRequired) {
            onBlowDetected();
            consecutiveSamplesRef.current = 0;
          }
        } else {
          consecutiveSamplesRef.current = 0;
        }

        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      };

      // Start analysis
      analyzeAudio();
    } catch (err) {
      console.error('Error setting up audio analysis:', err);
      setIsDetecting(false);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
      setIsDetecting(false);
      consecutiveSamplesRef.current = 0;
      smoothedIntensityRef.current = 0;
      baselineRef.current = null;
    };
  }, [stream, onBlowDetected]);

  return {
    isDetecting,
    blowIntensity,
  };
}
