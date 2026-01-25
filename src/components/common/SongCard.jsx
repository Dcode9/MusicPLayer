import { usePlayerStore } from '../../store/playerStore';
import { getImageUrl, extractArtists, formatDuration } from '../../utils/helpers';
import Icon from './Icon';
import './SongCard.css';

const SongCard = ({ song, showImage = true }) => {
  const { setQueue, likedSongs, toggleLike, currentSong, isPlaying } = usePlayerStore();

  const imageUrl = getImageUrl(song, 'low');
  const artists = extractArtists(song);
  const isLiked = likedSongs.some(s => s.id === song.id);
  const isCurrent = currentSong?.id === song.id;

  const handlePlay = () => {
    setQueue([song], 0);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    toggleLike(song);
  };

  return (
    <div 
      className={`song-card glass-card ${isCurrent ? 'active' : ''}`}
      onClick={handlePlay}
    >
      {showImage && (
        <div className="song-card-image">
          <img src={imageUrl} alt={song.name || song.title} />
          <div className="song-card-overlay">
            <button className="play-button">
              <Icon name={isCurrent && isPlaying ? 'pause' : 'play'} size={24} />
            </button>
          </div>
        </div>
      )}
      
      <div className="song-card-content">
        <div className="song-card-info">
          <div className="song-card-title truncate">
            {song.name || song.title}
          </div>
          <div className="song-card-artist truncate text-secondary">
            {artists}
          </div>
        </div>
        
        <div className="song-card-actions">
          {song.duration && (
            <span className="song-duration text-tertiary">
              {formatDuration(song.duration)}
            </span>
          )}
          <button 
            className={`icon-button ${isLiked ? 'liked' : ''}`}
            onClick={handleToggleLike}
          >
            <Icon name={isLiked ? 'heart' : 'heart-outline'} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
