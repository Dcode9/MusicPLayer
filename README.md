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

This application uses the JioSaavn API (`https://saavan-api-psi.vercel.app`) for:

- Searching songs, albums, artists, and playlists
- Fetching song details and streaming URLs
- Getting song lyrics and recommendations
- Browsing albums and artist discographies

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
