import { useState, useEffect } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import api from '../../services/api';
import SongCard from '../common/SongCard';
import AlbumCard from '../common/AlbumCard';
import Icon from '../common/Icon';
import './HomePage.css';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recentPlays, likedSongs } = usePlayerStore();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Fetch some popular searches to show as trending
        const result = await api.searchSongs('trending', 1, 20);
        setTrending(result.data?.results || result.results || []);
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="spinner animate-spin">
          <Icon name="album" size={64} />
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome Back</h1>
        <p className="text-secondary">Your personalized music experience</p>
      </header>

      {recentPlays.length > 0 && (
        <section className="home-section">
          <h2>Recently Played</h2>
          <div className="songs-list">
            {recentPlays.slice(0, 10).map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {likedSongs.length > 0 && (
        <section className="home-section">
          <h2>Liked Songs</h2>
          <div className="albums-grid">
            {likedSongs.slice(0, 6).map((song) => (
              <AlbumCard key={song.id} album={song} />
            ))}
          </div>
        </section>
      )}

      <section className="home-section">
        <h2>Discover Music</h2>
        <div className="songs-list">
          {trending.slice(0, 15).map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
