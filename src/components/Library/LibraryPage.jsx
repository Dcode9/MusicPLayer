import { usePlayerStore } from '../../store/playerStore';
import SongCard from '../common/SongCard';
import Icon from '../common/Icon';
import './LibraryPage.css';

const LibraryPage = () => {
  const { likedSongs, recentPlays, playlists } = usePlayerStore();

  return (
    <div className="library-page">
      <header className="library-header">
        <h1>Your Library</h1>
        <p className="text-secondary">All your music in one place</p>
      </header>

      {likedSongs.length > 0 && (
        <section className="library-section glass-panel">
          <div className="section-header">
            <Icon name="heart" size={28} />
            <h2>Liked Songs</h2>
            <span className="badge">{likedSongs.length}</span>
          </div>
          <div className="songs-list">
            {likedSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {recentPlays.length > 0 && (
        <section className="library-section glass-panel">
          <div className="section-header">
            <Icon name="playlist" size={28} />
            <h2>Recently Played</h2>
            <span className="badge">{recentPlays.length}</span>
          </div>
          <div className="songs-list">
            {recentPlays.slice(0, 20).map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {playlists.length > 0 && (
        <section className="library-section glass-panel">
          <div className="section-header">
            <Icon name="playlist" size={28} />
            <h2>Playlists</h2>
            <span className="badge">{playlists.length}</span>
          </div>
          <div className="playlists-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-card glass-card">
                <div className="playlist-icon">
                  <Icon name="playlist" size={48} />
                </div>
                <h3>{playlist.name}</h3>
                <p className="text-secondary">{playlist.songs.length} songs</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {likedSongs.length === 0 && recentPlays.length === 0 && playlists.length === 0 && (
        <div className="library-empty">
          <Icon name="library" size={64} />
          <h2>Your library is empty</h2>
          <p className="text-secondary">
            Start exploring music and your favorites will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
