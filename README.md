# Liquid Glass Music Player

A modern, full-featured music player web application with Apple's Liquid Glass Design aesthetic, powered by the JioSaavn API.

![Music Player](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎵 Features

### Core Player Features
- **Full Playback Controls**: Play/Pause, Next/Previous, Seek, Volume control
- **Advanced Modes**: Shuffle and Repeat (None/All/One) modes
- **Queue Management**: Add to queue, reorder, and manage playback queue
- **Keyboard Shortcuts**: Space to play/pause, Ctrl+Arrow keys for track navigation

### Music Discovery
- **Real-time Search**: Search across songs, albums, artists, and playlists with debouncing
- **Browse & Discover**: Home page with trending and personalized content
- **Search History**: Keep track of recent searches

### User Library
- **Liked Songs**: Save your favorite tracks
- **Recent Plays**: View your listening history (up to 50 tracks)
- **Custom Playlists**: Create and manage your own playlists
- **Local Storage**: All data persists across sessions

### UI/UX Excellence
- **Liquid Glass Design**: Translucent frosted glass panels with blur effects
- **Smooth Animations**: Spring-based transitions and micro-interactions
- **Dark/Light Mode**: Seamless theme switching
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Now Playing View**: Immersive full-screen player with album artwork

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dcode9/MusicPLayer.git
cd MusicPLayer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to Vercel

This project is configured for easy deployment on Vercel:

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dcode9/MusicPLayer)

### Manual Deployment

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. For production deployment:
```bash
vercel --prod
```

### Vercel Configuration

The project includes `vercel.json` with optimized settings:
- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured with rewrites for React Router
- **Cache Headers**: Optimized for static assets

### Environment Variables

No environment variables are required. The application uses the public JioSaavn API.

## 📁 Project Structure

```
src/
├── components/
│   ├── Player/
│   │   ├── PlayerBar.jsx       # Bottom player bar
│   │   ├── PlayerControls.jsx  # Playback controls
│   │   └── NowPlaying.jsx      # Full-screen player view
│   ├── Search/
│   │   └── SearchPage.jsx      # Search functionality
│   ├── Browse/
│   │   └── HomePage.jsx        # Home page
│   ├── Library/
│   │   └── LibraryPage.jsx     # User library
│   └── common/
│       ├── Sidebar.jsx         # Navigation sidebar
│       ├── Icon.jsx            # Icon component
│       ├── SongCard.jsx        # Song display card
│       └── AlbumCard.jsx       # Album display card
├── hooks/
│   ├── useAudio.js             # Audio playback hook
│   └── useUtils.js             # Utility hooks
├── services/
│   └── api.js                  # JioSaavn API service
├── store/
│   └── playerStore.js          # Global state management
├── styles/
│   └── glass-design.css        # Liquid Glass design system
├── utils/
│   └── helpers.js              # Helper functions
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## 🎨 Design System

The application uses a custom Liquid Glass design system with:

- **Translucent Surfaces**: `backdrop-filter: blur(40px)`
- **Dynamic Gradients**: Context-adaptive color schemes
- **Layered Depth**: Multiple glass layers with shadows
- **Smooth Animations**: CSS transitions with cubic-bezier easing
- **Responsive Typography**: System font stack for optimal readability

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Play/Pause |
| `Ctrl + →` | Next track |
| `Ctrl + ←` | Previous track |

## 🌐 API Integration

This application uses JioSaavn API for music streaming. 

**Current endpoint**: `https://jiosaavn-api-privatecvc.vercel.app` (switched from `saavan-api-psi.vercel.app` due to server issues)

Features provided by the API:

- Searching songs, albums, artists, and playlists
- Fetching song details and streaming URLs
- Getting song lyrics and recommendations
- Browsing albums and artist discographies

**No API keys required** - The application works out of the box.

### API Endpoints Used

- `GET /api/search?query={query}` - Global search
- `GET /api/search/songs?query={query}` - Search songs
- `GET /api/search/albums?query={query}` - Search albums
- `GET /api/search/artists?query={query}` - Search artists
- `GET /api/songs/{id}` - Get song details
- `GET /api/albums?id={id}` - Get album details
- `GET /api/artists?id={id}` - Get artist details

## 🔧 Technologies Used

- **React 18.3** - UI framework
- **Vite 5.1** - Build tool and dev server
- **Zustand 4.5** - State management with persistence
- **React Router 6.22** - Client-side routing
- **CSS Modules** - Scoped styling with Liquid Glass effects
- **Web Audio API** - Audio playback

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Desktop** (>1024px): Full sidebar, expanded player
- **Tablet** (768px-1024px): Collapsed sidebar, adaptive layouts
- **Mobile** (<768px): Hidden sidebar, mobile-optimized player

## ✨ Key Features Details

### Liquid Glass Design
The UI implements Apple's modern glass design with:
- Frosted glass effect using backdrop-filter
- Translucent panels with subtle borders
- Dynamic blur and saturation
- Soft shadows for depth
- Smooth spring animations

### State Management
- Zustand store for global state
- LocalStorage persistence for user data
- Optimized re-renders with selectors

### Audio System
- Custom audio hook for playback control
- Automatic song preloading
- Volume normalization
- Error handling and recovery

## 🔧 Troubleshooting

### Issue: "Nothing works" or API not loading

**The application uses a public JioSaavn API and does NOT require any API keys or environment variables.**

If you're experiencing issues after deployment:

#### 1. Check Browser Console
Open browser DevTools (F12) and check the Console tab for errors. Common issues:

- **CORS errors**: The JioSaavn API endpoint (`https://saavan-api-psi.vercel.app`) may be temporarily down or blocked
- **Network errors**: Check your internet connection
- **Failed to fetch**: API might be rate-limited or unreachable

#### 2. Verify Deployment
Ensure your Vercel deployment completed successfully:
```bash
# Check build logs in Vercel dashboard
# Build should show: "✓ built in X seconds"
```

#### 3. Test API Endpoint
Test if the API is accessible from your location:
```bash
curl https://jiosaavn-api-privatecvc.vercel.app/api/search?query=test
```

If this returns an error, try alternative endpoints listed below.

#### 4. Switch to Alternative API Endpoint (HTTP 500 Errors)

**UPDATE**: The default API endpoint (`saavan-api-psi.vercel.app`) is currently returning HTTP 500 errors. 

The application now uses `https://jiosaavn-api-privatecvc.vercel.app` by default.

If you still encounter issues, you can switch to alternative JioSaavn API endpoints by editing `src/services/api.js`:

```javascript
// Available API endpoints (in src/services/api.js)
const API_ENDPOINTS = {
  primary: 'https://jiosaavn-api-privatecvc.vercel.app',  // Current default
  fallback1: 'https://saavn.dev',
  fallback2: 'https://jiosaavn-api.vercel.app',
  original: 'https://saavan-api-psi.vercel.app', // Currently down (500 errors)
};

// Change this line to use a different endpoint:
const API_BASE_URL = API_ENDPOINTS.fallback1; // Try this if primary fails
```

After changing the endpoint:
1. Save the file
2. Rebuild: `npm run build`
3. Redeploy to Vercel

**Note**: All alternative endpoints use the same API structure, so no other code changes are needed.

#### 5. Common Deployment Checklist

- ✅ **No environment variables needed** - The app works out of the box
- ✅ **Build Command**: `npm run build` (auto-configured)
- ✅ **Output Directory**: `dist` (auto-configured)
- ✅ **Framework**: Vite (auto-detected by Vercel)
- ✅ **Node Version**: Use Node 16+ in Vercel settings if build fails

#### 6. Vercel-Specific Issues

If the app loads but routing doesn't work:
- Ensure `vercel.json` exists with the rewrite rules (already included)
- Check Vercel dashboard → Settings → General → Framework Preset is set to "Vite"

If the build fails:
- Check Vercel build logs for specific errors
- Ensure dependencies are installed: `npm install` should complete without errors locally
- Try clearing Vercel cache: Dashboard → Deployments → ⋯ → Redeploy

### Local Development Issues

If the app doesn't work in local development:

```bash
# 1. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 2. Clear Vite cache
rm -rf node_modules/.vite

# 3. Restart dev server
npm run dev
```

### Still Having Issues?

1. **Check API Status**: The JioSaavn API endpoint may have rate limits or temporary outages
2. **Browser Compatibility**: Use a modern browser (Chrome, Firefox, Safari, Edge - latest versions)
3. **Ad Blockers**: Some ad blockers may interfere with API calls - try disabling temporarily
4. **VPN/Proxy**: If using VPN, the API might be blocked in that region

**Note**: The application is fully client-side and requires no backend setup. All features work once the API endpoint is accessible.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- JioSaavn API for music data
- Apple's design principles for inspiration
- React and Vite communities

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ and React
