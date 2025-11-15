# Sound Effects Guide

## Recommended Free Resources

### 1. Freesound.org (Best Option)
- **URL**: https://freesound.org
- **License**: Various Creative Commons licenses (check each file)
- **Search Terms**:
  - "blow" or "whoosh" for candle blow sound
  - "confetti" or "party pop" for celebration sound
  - "happy birthday" for background music

**Recommended Files**:
- Blow sound: Search "blow whoosh" (many CC0 options)
- Confetti: Search "party pop" or "celebration"
- Background: Search "happy birthday instrumental"

### 2. Pixabay
- **URL**: https://pixabay.com/music/
- **License**: Free for commercial use, no attribution required
- **Search**: "birthday", "celebration", "party"

### 3. Zapsplat
- **URL**: https://www.zapsplat.com
- **License**: Free with account (requires free registration)
- **Category**: Sound Effects > Celebrations

### 4. Incompetech (Kevin MacLeod)
- **URL**: https://incompetech.com/music/royalty-free/
- **License**: Creative Commons (attribution required)
- **Search**: "Happy" or "Celebration" in the music library

## File Requirements

Place downloaded files in `public/sounds/` directory:

```
public/sounds/
├── birthday-song.mp3  (or .ogg, .wav)
├── blow.mp3
└── confetti.mp3
```

## Format Recommendations

- **Format**: MP3 (best compatibility) or OGG (smaller size)
- **Bitrate**: 128-192 kbps for music, 64-128 kbps for sound effects
- **Sample Rate**: 44.1 kHz
- **Duration**: 
  - Background music: 30-60 seconds (will loop)
  - Sound effects: 0.5-2 seconds

## Quick Download Links

### Freesound.org Direct Searches:
1. **Blow Sound**: https://freesound.org/search/?q=blow+whoosh
2. **Confetti/Pop**: https://freesound.org/search/?q=party+pop
3. **Birthday Music**: https://freesound.org/search/?q=happy+birthday

### Alternative: Generate Simple Sounds

If you can't find suitable files, you can use online tone generators:
- **URL**: https://onlinetonegenerator.com/
- Generate simple beeps/tones for placeholder sounds

## License Checklist

When downloading sounds, ensure:
- ✅ Free for commercial use (if needed)
- ✅ No attribution required (or minimal attribution)
- ✅ Compatible with your project license
- ✅ Download in MP3 or OGG format

## Testing

After adding sounds:
1. Run `npm run dev`
2. Test each sound plays correctly
3. Check volume levels (adjust in `src/utils/audio.ts` if needed)
4. Verify sounds work on mobile devices

## Troubleshooting

If sounds don't play:
- Check browser console for errors
- Verify file paths are correct
- Ensure files are in `public/sounds/` directory
- Check file format (MP3 recommended)
- Test in different browsers





