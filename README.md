# 🎂 Birthday Celebration Website

A modern, interactive birthday celebration website where users can blow out candles on a virtual cake using their webcam!

## Features

- 🎂 **Interactive Cake**: Beautiful animated cake with candles
- 💨 **Webcam Blow Detection**: Blow into your webcam to extinguish candles
- 🔗 **Permalink Generation**: Create shareable links valid for 24 hours
- 🎉 **Celebration Effects**: Confetti animation and sound effects
- 🎵 **Background Music**: Optional birthday music
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **GitHub Pages Ready**: Easy deployment to GitHub Pages

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **Web APIs**: MediaDevices (webcam), Canvas (motion detection), Web Audio

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd birthday
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Adding Audio Files (Optional)

For full audio experience, add these files to `public/sounds/`:
- `birthday-song.mp3` - Background music
- `blow.mp3` - Candle blow sound effect
- `confetti.mp3` - Celebration sound effect

The app will work without these files, but without audio.

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with static files ready for deployment.

## Deployment to GitHub Pages

### Option 1: Manual Deployment

1. Update `vite.config.ts` to set the correct `base` path:
```typescript
base: '/your-repo-name/', // Change to your GitHub repository name
```

2. Build the project:
```bash
npm run build
```

3. Push the `dist/` folder contents to the `gh-pages` branch:
```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Add deploy script to package.json
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 2: GitHub Actions (Automatic)

1. Update `vite.config.ts` base path to match your repository name
2. Push code to GitHub
3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy on push to main

## How It Works

1. **Create Celebration**: Enter the birthday person's name and optionally a custom message
2. **Generate Link**: A unique permalink is created with 24-hour expiration
3. **Share Link**: Share the link with friends and family
4. **Blow Candles**: When someone opens the link, they can blow into their webcam to extinguish candles
5. **Celebrate**: After all candles are blown, a celebration message appears with confetti!

## Browser Requirements

- Modern browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- HTTPS required for webcam access (or localhost for development)
- Camera permissions must be granted

## Customization

### Change Number of Candles

Edit `src/App.tsx`:
```typescript
<Cake ref={cakeRef} numberOfCandles={7} ... />
```

### Adjust Blow Detection Sensitivity

Edit `src/hooks/useBlowDetection.ts`:
```typescript
const blowThreshold = 50; // Increase for more sensitive, decrease for less
```

### Customize Colors

Edit `tailwind.config.js` to modify the color scheme.

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

