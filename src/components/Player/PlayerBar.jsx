import { useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { getImageUrl, extractArtists } from '../../utils/helpers';
import PlayerControls from './PlayerControls';
import NowPlaying from './NowPlaying';
import Icon from '../common/Icon';
import './PlayerBar.css';

const PlayerBar = () => {
  const { currentSong, likedSongs, toggleLike } = usePlayerStore();
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  if (!currentSong) {
    return null;
  }

  const imageUrl = getImageUrl(currentSong, 'medium');
  const artists = extractArtists(currentSong);
  const isLiked = likedSongs.some(s => s.id === currentSong.id);

  return (
    <>
      <div className="player-bar glass-panel">
        {/* Current song info */}
        <div className="player-song-info" onClick={() => setShowNowPlaying(true)}>
          <img 
            src={imageUrl} 
            alt={currentSong.name || currentSong.title}
            className="player-album-art"
          />
          <div className="player-song-details">
            <div className="player-song-title truncate">
              {currentSong.name || currentSong.title}
            </div>
            <div className="player-song-artist truncate text-secondary">
              {artists}
            </div>
          </div>
          <button 
            className={`icon-button ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(currentSong);
            }}
          >
            <Icon name={isLiked ? 'heart' : 'heart-outline'} size={20} />
          </button>
        </div>

        {/* Player controls */}
        <div className="player-controls-wrapper">
          <PlayerControls />
        </div>

        {/* Right section (queue, etc.) */}
        <div className="player-actions">
          <button className="icon-button">
            <Icon name="queue" size={20} />
          </button>
        </div>
      </div>

      {/* Full screen now playing */}
      {showNowPlaying && (
        <NowPlaying onClose={() => setShowNowPlaying(false)} />
      )}
    </>
  );
};

export default PlayerBar;
