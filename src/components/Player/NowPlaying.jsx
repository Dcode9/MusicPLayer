import { useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { getImageUrl, extractArtists } from '../../utils/helpers';
import Icon from '../common/Icon';
import './NowPlaying.css';

const NowPlaying = ({ onClose }) => {
  const { currentSong, likedSongs, toggleLike } = usePlayerStore();
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState(null);

  const isLiked = currentSong && likedSongs.some(s => s.id === currentSong.id);

  const handleToggleLike = () => {
    if (currentSong) {
      toggleLike(currentSong);
    }
  };

  if (!currentSong) {
    return null;
  }

  const imageUrl = getImageUrl(currentSong, 'high');
  const artists = extractArtists(currentSong);

  return (
    <div className="now-playing-overlay" onClick={onClose}>
      <div className="now-playing-content" onClick={(e) => e.stopPropagation()}>
        {/* Background blur effect */}
        <div 
          className="now-playing-background" 
          style={{ 
            backgroundImage: `url(${imageUrl})`,
          }}
        />

        {/* Close button */}
        <button className="close-button glass-button" onClick={onClose}>
          <Icon name="close" size={24} />
        </button>

        {/* Album artwork */}
        <div className="artwork-container">
          <div className="artwork-wrapper glass-panel">
            <img 
              src={imageUrl} 
              alt={currentSong.name || currentSong.title}
              className="artwork-image"
            />
          </div>
        </div>

        {/* Song info */}
        <div className="song-info">
          <h1 className="song-title">{currentSong.name || currentSong.title}</h1>
          <p className="song-artist text-secondary">{artists}</p>
          {currentSong.album?.name && (
            <p className="song-album text-tertiary">{currentSong.album.name}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          <button 
            className={`action-button glass-button ${isLiked ? 'liked' : ''}`}
            onClick={handleToggleLike}
          >
            <Icon name={isLiked ? 'heart' : 'heart-outline'} size={24} />
          </button>
          
          <button 
            className="action-button glass-button"
            onClick={() => setShowLyrics(!showLyrics)}
          >
            <Icon name="playlist" size={24} />
            <span>Lyrics</span>
          </button>

          <button className="action-button glass-button">
            <Icon name="more" size={24} />
          </button>
        </div>

        {/* Lyrics (if shown) */}
        {showLyrics && (
          <div className="lyrics-container glass-panel">
            <h3>Lyrics</h3>
            {lyrics ? (
              <div className="lyrics-text">{lyrics}</div>
            ) : (
              <p className="text-secondary">Lyrics not available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlaying;
