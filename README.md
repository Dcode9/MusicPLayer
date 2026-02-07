# MusicPLayer

A modern, cloud-based music player with spatial audio visualization.

## Features

- 🎵 Music playback with visual waveform
- 🎨 Dynamic color extraction from album art
- 📱 Mobile-responsive design
- 🔍 Search functionality with "/" shortcut
- 📂 Playlist management
- 🔄 Smart autoplay algorithm
- 💾 LocalStorage for persistence

## Deployment

This app is ready for deployment on Vercel or any static hosting platform.

### Quick Deploy to Vercel

1. Push this repository to GitHub
2. Import the project in Vercel
3. Deploy - no configuration needed!

The app uses `index.html` as the entry point, which Vercel automatically recognizes.

## Development

To run locally:

```bash
# Start a simple HTTP server
python3 -m http.server 8000

# Or use any other static server
npx serve
```

Then open `http://localhost:8000` in your browser.

## Technology Stack

- Pure HTML/CSS/JavaScript (no build step required)
- TailwindCSS (CDN)
- Web Audio API for visualization
- Service Worker for PWA support

## Future Enhancements

- Integration with Jio Saavn API for music streaming
- More songs in the library
- Enhanced playlist features
- Social sharing capabilities
