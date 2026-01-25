import { NavLink } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore';
import Icon from '../common/Icon';
import './Sidebar.css';

const Sidebar = () => {
  const { theme, toggleTheme, playlists } = usePlayerStore();

  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/search', icon: 'search', label: 'Search' },
    { path: '/library', icon: 'library', label: 'Your Library' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
          <Icon name="album" size={32} />
          <span>Music</span>
        </h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon name={item.icon} size={24} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <div className="sidebar-playlists">
        <div className="playlists-header">
          <h3>Playlists</h3>
          <button className="icon-button">
            <Icon name="add" size={20} />
          </button>
        </div>
        
        {playlists.length === 0 ? (
          <p className="text-secondary text-sm">No playlists yet</p>
        ) : (
          <div className="playlists-list">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <Icon name="playlist" size={20} />
                <span>{playlist.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button 
          className="theme-toggle glass-button"
          onClick={toggleTheme}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
          <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
