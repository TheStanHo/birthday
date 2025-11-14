import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

interface CakeProps {
  numberOfCandles?: number;
  onAllCandlesBlown?: () => void;
}

export interface CakeHandle {
  blow: () => void;
}

const Cake = forwardRef<CakeHandle, CakeProps>(
  ({ numberOfCandles = 5, onAllCandlesBlown }, ref) => {
    const [blownCandles, setBlownCandles] = useState<Set<number>>(new Set());

    const handleCandleBlow = () => {
      // Find first unblown candle
      for (let i = 0; i < numberOfCandles; i++) {
        if (!blownCandles.has(i)) {
          const newBlownCandles = new Set(blownCandles);
          newBlownCandles.add(i);
          setBlownCandles(newBlownCandles);
          
          // Check if all candles are blown
          if (newBlownCandles.size === numberOfCandles && onAllCandlesBlown) {
            setTimeout(() => {
              onAllCandlesBlown();
            }, 500);
          }
          break;
        }
      }
    };

    useImperativeHandle(ref, () => ({
      blow: handleCandleBlow,
    }));

    return (
      <div className="cake-container">
        <div className="relative">
          {/* Cake base */}
          <div className="relative">
            {/* Bottom layer */}
            <div className="w-80 h-32 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full shadow-lg mx-auto"></div>
            
            {/* Top layer */}
            <div className="w-56 h-24 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-full shadow-md mx-auto -mt-4"></div>
            
            {/* Frosting decoration */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-56 h-6 bg-pink-100 rounded-full"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-pink-200 rounded-full"></div>
          </div>

          {/* Candles */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-4 -mt-8">
            {Array.from({ length: numberOfCandles }).map((_, index) => {
              const isBlown = blownCandles.has(index);
              
              return (
                <div key={index} className="flex flex-col items-center">
                  {/* Flame - positioned on top */}
                  {!isBlown ? (
                    <div className="candle-flame relative mb-1">
                      <div className="w-4 h-6 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full shadow-lg"></div>
                      <div className="candle-flame-inner absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-yellow-300 rounded-full opacity-80"></div>
                    </div>
                  ) : (
                    <div className="relative mb-1 animate-blow-out">
                      <div className="w-2 h-2 bg-gray-400 rounded-full opacity-50"></div>
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Candle stick - positioned below flame */}
                  <div className="w-3 h-16 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-t-sm shadow-md"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

Cake.displayName = 'Cake';

export default Cake;

