import { useState, useRef, useEffect } from 'react';
import NameForm from './components/NameForm';
import Cake, { CakeHandle } from './components/Cake';
import WebcamDetector from './components/WebcamDetector';
import BirthdayMessage from './components/BirthdayMessage';
import { usePermalink } from './hooks/usePermalink';
import { playBlowSound, initAudio, playBackgroundMusic, stopBackgroundMusic } from './utils/audio';

function App() {
  const { permalinkData, isExpired, timeRemaining } = usePermalink();
  const [showNameForm, setShowNameForm] = useState(!permalinkData);
  const [showCake, setShowCake] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const cakeRef = useRef<CakeHandle>(null);

  useEffect(() => {
    // Initialize audio on mount
    initAudio();
  }, []);

  useEffect(() => {
    // If we have valid permalink data, show the cake
    if (permalinkData && !isExpired) {
      setShowNameForm(false);
      setShowCake(true);
      // Auto-start music when cake appears (with slight delay for browser autoplay policies)
      if (musicEnabled) {
        setTimeout(() => {
          playBackgroundMusic();
        }, 500);
      }
      // Auto-start microphone after a short delay
      setTimeout(() => {
        setWebcamActive(true);
      }, 1000);
    }
  }, [permalinkData, isExpired]);

  const handlePermalinkGenerated = (permalink: string, _name: string) => {
    // Navigate to the permalink URL to show the cake
    window.location.href = permalink;
  };

  const handleBlowDetected = () => {
    if (cakeRef.current) {
      playBlowSound();
      cakeRef.current.blow();
    }
  };

  const handleAllCandlesBlown = () => {
    setShowBirthdayMessage(true);
    setWebcamActive(false);
  };

  const toggleMusic = () => {
    if (musicEnabled) {
      stopBackgroundMusic();
      setMusicEnabled(false);
    } else {
      setMusicEnabled(true);
      // Play music when user toggles it on (user interaction allows autoplay)
      playBackgroundMusic();
    }
  };

  if (showNameForm) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <NameForm onPermalinkGenerated={handlePermalinkGenerated} />
      </div>
    );
  }

  if (isExpired && permalinkData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Link Expired</h2>
          <p className="text-gray-600 mb-6">
            This birthday celebration link has expired. Links are valid for 24 hours.
          </p>
          <button
            onClick={() => {
              window.location.href = window.location.pathname;
            }}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
          >
            Create New Celebration
          </button>
        </div>
      </div>
    );
  }

  if (showBirthdayMessage && permalinkData) {
    return (
      <>
        <Cake ref={cakeRef} numberOfCandles={5} onAllCandlesBlown={handleAllCandlesBlown} />
        <BirthdayMessage 
          name={permalinkData.name} 
          customMessage={permalinkData.customMessage}
          autoPlayMusic={musicEnabled}
        />
      </>
    );
  }

  if (showCake && permalinkData) {
    return (
      <div className="min-h-screen">
        {/* Header with name and time remaining */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-purple-600">
                🎂 Happy Birthday, {permalinkData.name}! 🎂
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {timeRemaining && <span>⏰ {timeRemaining}</span>}
              </div>
              <button
                onClick={toggleMusic}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  musicEnabled
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label={musicEnabled ? 'Stop music' : 'Play music'}
              >
                {musicEnabled ? '🔊 Music On' : '🔇 Music Off'}
              </button>
            </div>
          </div>
        </div>

        {/* Cake */}
        <Cake ref={cakeRef} numberOfCandles={5} onAllCandlesBlown={handleAllCandlesBlown} />

        {/* Webcam Detector */}
        <div className="absolute bottom-8 left-4 right-4 z-10">
          <div className="max-w-2xl mx-auto">
            <WebcamDetector onBlowDetected={handleBlowDetected} isActive={webcamActive} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;

