/**
 * Audio utility functions for managing sound effects and background music
 */

let backgroundMusic: HTMLAudioElement | null = null;
let blowSound: HTMLAudioElement | null = null;
let confettiSound: HTMLAudioElement | null = null;
let audioInitialized = false;

/**
 * Get the base path for assets (handles GitHub Pages subdirectory)
 */
function getAssetPath(path: string): string {
  // Vite handles base path automatically in production, but we need to handle it in dev
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}

/**
 * Initialize audio elements
 * Gracefully handles missing audio files
 */
export function initAudio() {
  if (audioInitialized) return;
  
  try {
    // Background music - try both paths
    const musicPath = getAssetPath('birthday-song.mp3');
    backgroundMusic = new Audio(musicPath);
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.preload = 'auto';
    backgroundMusic.onerror = () => {
      console.warn('Background music file not found');
      backgroundMusic = null;
    };
    
    // Blow sound effect
    blowSound = new Audio(getAssetPath('sounds/blow.mp3'));
    blowSound.volume = 0.5;
    blowSound.onerror = () => {
      console.warn('Blow sound file not found');
      blowSound = null;
    };
    
    // Confetti sound effect
    confettiSound = new Audio(getAssetPath('sounds/confetti.mp3'));
    confettiSound.volume = 0.4;
    confettiSound.onerror = () => {
      console.warn('Confetti sound file not found');
      confettiSound = null;
    };
    
    audioInitialized = true;
  } catch (error) {
    console.warn('Audio initialization failed:', error);
  }
}

/**
 * Play background music
 */
export function playBackgroundMusic(): void {
  if (backgroundMusic) {
    // Reset to beginning if already playing
    if (backgroundMusic.currentTime > 0 && backgroundMusic.paused) {
      backgroundMusic.currentTime = 0;
    }
    backgroundMusic.play().catch(err => {
      console.warn('Could not play background music:', err);
      // Some browsers require user interaction - try again on next interaction
      if (err.name === 'NotAllowedError' || err.name === 'NotSupportedError') {
        console.info('Music will play after user interaction');
      }
    });
  }
}

/**
 * Stop background music
 */
export function stopBackgroundMusic(): void {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
}

/**
 * Set background music volume (0-1)
 */
export function setBackgroundMusicVolume(volume: number): void {
  if (backgroundMusic) {
    backgroundMusic.volume = Math.max(0, Math.min(1, volume));
  }
}

/**
 * Play blow sound effect
 */
export function playBlowSound(): void {
  if (blowSound) {
    blowSound.currentTime = 0;
    blowSound.play().catch(err => {
      console.warn('Could not play blow sound:', err);
    });
  }
}

/**
 * Play confetti sound effect
 */
export function playConfettiSound(): void {
  if (confettiSound) {
    confettiSound.currentTime = 0;
    confettiSound.play().catch(err => {
      console.warn('Could not play confetti sound:', err);
    });
  }
}

