import { usePlayerStore } from '../../store/playerStore';
import { useAudio } from '../../hooks/useAudio';
import { formatTime } from '../../utils/helpers';
import Icon from '../common/Icon';
import './PlayerControls.css';

const PlayerControls = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    progress,
    duration,
    isShuffled,
    repeatMode,
    setIsPlaying,
    setVolume,
    toggleMute,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const { seek } = useAudio();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setVolume(percentage);
  };

  const getRepeatIcon = () => {
    if (repeatMode === 'one') return 'repeat-one';
    return 'repeat';
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="player-controls glass-panel">
      {/* Progress bar */}
      <div className="progress-container">
        <span className="time text-sm text-secondary">{formatTime(progress)}</span>
        <div className="progress-bar" onClick={handleSeek}>
          <div 
            className="progress-fill" 
            style={{ width: `${(progress / duration) * 100}%` }}
          />
          <div 
            className="progress-handle" 
            style={{ left: `${(progress / duration) * 100}%` }}
          />
        </div>
        <span className="time text-sm text-secondary">{formatTime(duration)}</span>
      </div>

      {/* Main controls */}
      <div className="main-controls">
        <button 
          className={`control-button ${isShuffled ? 'active' : ''}`}
          onClick={toggleShuffle}
          title="Shuffle"
        >
          <Icon name="shuffle" size={20} />
        </button>

        <button className="control-button" onClick={playPrevious} title="Previous">
          <Icon name="previous" size={28} />
        </button>

        <button className="control-button play-button" onClick={handlePlayPause}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={32} />
        </button>

        <button className="control-button" onClick={playNext} title="Next">
          <Icon name="next" size={28} />
        </button>

        <button 
          className={`control-button ${repeatMode !== 'none' ? 'active' : ''}`}
          onClick={toggleRepeat}
          title={`Repeat: ${repeatMode}`}
        >
          <Icon name={getRepeatIcon()} size={20} />
        </button>
      </div>

      {/* Volume control */}
      <div className="volume-control">
        <button className="control-button" onClick={toggleMute}>
          <Icon name={isMuted || volume === 0 ? 'volume-mute' : 'volume'} size={20} />
        </button>
        <div className="volume-bar" onClick={handleVolumeChange}>
          <div 
            className="volume-fill" 
            style={{ width: `${volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
