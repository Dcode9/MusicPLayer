import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { usePlayerStore } from './store/playerStore';
import { useAudio } from './hooks/useAudio';
import Sidebar from './components/common/Sidebar';
import PlayerBar from './components/Player/PlayerBar';
import HomePage from './components/Browse/HomePage';
import SearchPage from './components/Search/SearchPage';
import LibraryPage from './components/Library/LibraryPage';
import './App.css';

function App() {
  const { theme } = usePlayerStore();
  
  // Initialize audio player
  useAudio();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Space bar to play/pause (when not typing in input)
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const { isPlaying, setIsPlaying } = usePlayerStore.getState();
        setIsPlaying(!isPlaying);
      }

      // Arrow keys for seek/volume
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        const { playNext, playPrevious } = usePlayerStore.getState();
        
        if (e.code === 'ArrowRight' && e.ctrlKey) {
          e.preventDefault();
          playNext();
        } else if (e.code === 'ArrowLeft' && e.ctrlKey) {
          e.preventDefault();
          playPrevious();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </main>
        <PlayerBar />
      </div>
    </Router>
  );
}

export default App;
