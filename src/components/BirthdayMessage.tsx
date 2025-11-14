import { useEffect, useState } from 'react';
import { playConfettiSound, playBackgroundMusic } from '../utils/audio';

interface BirthdayMessageProps {
  name: string;
  customMessage?: string;
  autoPlayMusic?: boolean;
}

export default function BirthdayMessage({ name, customMessage, autoPlayMusic = true }: BirthdayMessageProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Play celebration sounds
    playConfettiSound();
    if (autoPlayMusic) {
      playBackgroundMusic();
    }

    // Stop confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 text-center relative overflow-hidden">
        {/* Confetti animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#FFD700', '#FF69B4', '#9370DB', '#FF6347', '#00CED1'][
                    Math.floor(Math.random() * 5)
                  ],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 overflow-visible">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight px-2 break-words" style={{
            background: 'linear-gradient(to right, #ec4899, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem'
          }}>
            🎉 Happy Birthday! 🎉
          </h1>
          
          <h2 className="text-3xl font-semibold text-purple-600 mb-6">
            {name}!
          </h2>

          {customMessage && (
            <p className="text-xl text-gray-700 mb-6 italic">
              {customMessage}
            </p>
          )}

          <div className="text-6xl mb-4">
            🎂🎈🎊
          </div>

          <p className="text-gray-600">
            Wishing you a wonderful day filled with joy and happiness!
          </p>
        </div>
      </div>
    </div>
  );
}

