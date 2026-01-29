import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useUtils';
import { usePlayerStore } from '../../store/playerStore';
import { getImageUrl } from '../../utils/helpers';
import api from '../../services/api';
import Icon from '../common/Icon';
import SongCard from '../common/SongCard';
import AlbumCard from '../common/AlbumCard';
import './SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const debouncedQuery = useDebounce(query, 500);
  const { searchHistory, addToSearchHistory } = usePlayerStore();

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await api.globalSearch(debouncedQuery);
        console.log('Search API Response:', data); // Debug log
        const resultsData = data.data || data;
        console.log('Search Results:', resultsData); // Debug log
        setResults(resultsData);
        addToSearchHistory(debouncedQuery);
      } catch (error) {
        console.error('Search error:', error);
        setError('Unable to search. The music service may be unavailable. Please try again later.');
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, addToSearchHistory]);

  const handleSearchHistoryClick = (historyQuery) => {
    setQuery(historyQuery);
  };

  const renderResults = () => {
    if (error) {
      return (
        <div className="search-empty">
          <Icon name="search" size={64} />
          <h2>Search Unavailable</h2>
          <p className="text-secondary">{error}</p>
          <div className="error-hint glass-panel">
            <p className="text-sm">
              <strong>Troubleshooting:</strong><br/>
              • Check your internet connection<br/>
              • The music service may be temporarily down<br/>
              • Try again in a few moments<br/>
              • If the issue persists, the API endpoint may be blocked in your region
            </p>
          </div>
        </div>
      );
    }

    if (!results) {
      return (
        <div className="search-empty">
          <Icon name="search" size={64} />
          <h2>Search for music</h2>
          <p className="text-secondary">Find your favorite songs, albums, artists, and playlists</p>
          
          {searchHistory.length > 0 && (
            <div className="search-history glass-panel">
              <h3>Recent Searches</h3>
              <div className="history-list">
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    className="history-item glass-button"
                    onClick={() => handleSearchHistoryClick(item)}
                  >
                    <Icon name="search" size={16} />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (loading) {
      return (
        <div className="search-loading">
          <div className="spinner animate-spin">
            <Icon name="album" size={48} />
          </div>
          <p>Searching...</p>
        </div>
      );
    }

    const tabs = [
      { id: 'all', label: 'All' },
      { id: 'songs', label: 'Songs' },
      { id: 'albums', label: 'Albums' },
      { id: 'artists', label: 'Artists' },
      { id: 'playlists', label: 'Playlists' },
    ];

    return (
      <div className="search-results">
        <div className="search-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="results-content">
          {(activeTab === 'all' || activeTab === 'songs') && results.songs?.results?.length > 0 && (
            <section className="results-section">
              <h2>Songs</h2>
              <div className="songs-grid">
                {results.songs.results.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'albums') && results.albums?.results?.length > 0 && (
            <section className="results-section">
              <h2>Albums</h2>
              <div className="albums-grid">
                {results.albums.results.slice(0, 8).map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'artists') && results.artists?.results?.length > 0 && (
            <section className="results-section">
              <h2>Artists</h2>
              <div className="artists-grid">
                {results.artists.results.slice(0, 8).map((artist) => (
                  <div key={artist.id} className="artist-card glass-card">
                    <img 
                      src={getImageUrl(artist, 'medium')} 
                      alt={artist.name}
                    />
                    <h3>{artist.name}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'playlists') && results.playlists?.results?.length > 0 && (
            <section className="results-section">
              <h2>Playlists</h2>
              <div className="playlists-grid">
                {results.playlists.results.slice(0, 8).map((playlist) => (
                  <div key={playlist.id} className="playlist-card glass-card">
                    <img 
                      src={getImageUrl(playlist, 'medium')} 
                      alt={playlist.name || playlist.title}
                    />
                    <h3>{playlist.name || playlist.title}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="search-page">
      <div className="search-header glass-panel">
        <div className="search-input-wrapper">
          <Icon name="search" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button 
              className="clear-button"
              onClick={() => setQuery('')}
            >
              <Icon name="close" size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="search-content">
        {renderResults()}
      </div>
    </div>
  );
};

export default SearchPage;
