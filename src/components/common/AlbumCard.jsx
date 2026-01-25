import { getImageUrl, extractArtists } from '../../utils/helpers';
import './AlbumCard.css';

const AlbumCard = ({ album }) => {
  const imageUrl = getImageUrl(album, 'medium');
  const artists = extractArtists(album);

  return (
    <div className="album-card glass-card">
      <div className="album-card-image">
        <img src={imageUrl} alt={album.name || album.title} />
      </div>
      <div className="album-card-info">
        <h3 className="album-card-title truncate">
          {album.name || album.title}
        </h3>
        <p className="album-card-artist truncate text-secondary">
          {artists}
        </p>
        {album.year && (
          <p className="album-card-year text-tertiary">
            {album.year}
          </p>
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
