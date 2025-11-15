# 🎂 Birthday Celebration Website

A modern, interactive birthday celebration website where users can blow out candles on a virtual cake using their microphone!

**Created by [stanho.dev](https://stanho.dev)**

## About

This project was created to bring joy and interactivity to birthday celebrations in the digital age. It combines modern web technologies with creative design to create a memorable experience that can be shared with friends and family, even when celebrating remotely.

## Features

- 🎂 **Interactive Cake**: Beautiful animated cake with candles
- 💨 **Microphone Blow Detection**: Blow into your microphone to extinguish candles
- 🔗 **Permalink Generation**: Create shareable links valid for 24 hours
- 🎉 **Celebration Effects**: Confetti animation and sound effects
- 🎵 **Background Music**: Optional birthday music with toggle control
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **GitHub Pages Ready**: Easy deployment to GitHub Pages
- ✅ **Comprehensive Testing**: Full test suite with Vitest and React Testing Library
- ⏰ **Time Remaining Display**: Shows countdown for link expiration

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **Web APIs**: MediaDevices (microphone), Web Audio API (blow detection)

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

### Option 2: GitHub Actions (Automatic) - Recommended

1. The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured
2. Push code to GitHub
3. Go to your repository → Settings → Pages
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically build and deploy on push to `main` branch
6. For custom domain `birthday.stanho.dev`:
   - In Pages settings, add your custom domain
   - Update your DNS to point to GitHub Pages (see GitHub's documentation)
   - The `public/CNAME` file is already configured

## How It Works

1. **Create Celebration**: Enter the birthday person's name and optionally a custom message
2. **Generate Link**: A unique permalink is created with 24-hour expiration
3. **Share Link**: Share the link with friends and family
4. **Blow Candles**: When someone opens the link, they can blow into their microphone to extinguish candles
5. **Celebrate**: After all candles are blown, a celebration message appears with confetti!

## Browser Requirements

- Modern browser with Web Audio API support (Chrome, Firefox, Safari, Edge)
- HTTPS required for microphone access (or localhost for development)
- Microphone permissions must be granted

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Visual feedback for all interactions
- Works without audio files (graceful degradation)

## Customization

### Change Number of Candles

Edit `src/App.tsx`:
```typescript
<Cake ref={cakeRef} numberOfCandles={7} ... />
```

### Adjust Blow Detection Sensitivity

Edit `src/hooks/useBlowDetection.ts`:
```typescript
const blowThreshold = 50; // Increase for less sensitive (harder to trigger), decrease for more sensitive
const consecutiveSamplesRequired = 5; // Number of consecutive high-volume samples needed
```

### Customize Colors

Edit `tailwind.config.js` to modify the color scheme.

## Testing

The project includes a comprehensive test suite using Vitest and React Testing Library.

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## About the Creator

This project was created by **stanho.dev** - a developer passionate about creating interactive and engaging web experiences.

- 🌐 Website: [stanho.dev](https://stanho.dev)
- 📧 For questions or feedback, please open an issue on GitHub

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

