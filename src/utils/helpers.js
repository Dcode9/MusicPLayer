export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getImageUrl = (song, quality = 'high') => {
  if (!song || !song.image) return null;
  
  if (Array.isArray(song.image)) {
    const qualityMap = {
      low: 0,
      medium: 1,
      high: 2,
    };
    const index = qualityMap[quality] || 2;
    return song.image[index]?.link || song.image[0]?.link;
  }
  
  return song.image;
};

export const extractArtists = (song) => {
  if (!song) return 'Unknown Artist';
  
  if (song.primaryArtists) {
    return song.primaryArtists;
  }
  
  if (song.artists?.primary && Array.isArray(song.artists.primary)) {
    return song.artists.primary.map(a => a.name).join(', ');
  }
  
  if (song.artist) {
    return song.artist;
  }
  
  return 'Unknown Artist';
};

export const getDownloadUrl = (song, quality = 'high') => {
  if (!song || !song.downloadUrl) return null;
  
  if (Array.isArray(song.downloadUrl)) {
    const qualityMap = {
      low: 1,
      medium: 2,
      high: 4,
      'very-high': 5,
    };
    const index = qualityMap[quality] || 4;
    return song.downloadUrl[index]?.link || 
           song.downloadUrl[4]?.link || 
           song.downloadUrl[3]?.link ||
           song.downloadUrl[0]?.link;
  }
  
  return song.downloadUrl;
};

export const extractColors = async (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      const pixelCount = data.length / 4;
      
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);
      
      resolve({ r, g, b });
    };
    
    img.onerror = () => {
      resolve({ r: 100, g: 100, b: 100 });
    };
    
    img.src = imageUrl;
  });
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
