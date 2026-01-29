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
  
  // If image is already a string URL, return it
  if (typeof song.image === 'string') {
    return song.image;
  }
  
  // If image is an array of image objects
  if (Array.isArray(song.image)) {
    const qualityMap = {
      low: 0,
      medium: 1,
      high: 2,
    };
    const index = qualityMap[quality] || 2;
    
    // Try to get the image at the specified quality
    const imageObj = song.image[index] || song.image[song.image.length - 1] || song.image[0];
    
    // Handle different response formats
    if (imageObj) {
      // Check for common URL property names
      return imageObj.url || imageObj.link || imageObj.src || (typeof imageObj === 'string' ? imageObj : null);
    }
  }
  
  // If image is an object with a URL property
  if (typeof song.image === 'object' && song.image !== null) {
    return song.image.url || song.image.link || song.image.src || null;
  }
  
  return null;
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
  if (!song) return null;
  
  // Check multiple possible property names for download URL
  const urlSource = song.downloadUrl || song.url || song.media_url || song.streamUrl;
  
  if (!urlSource) return null;
  
  // If it's already a string URL, return it
  if (typeof urlSource === 'string') {
    return urlSource;
  }
  
  // If it's an array of download URL objects
  if (Array.isArray(urlSource)) {
    const qualityMap = {
      low: 0,
      medium: 1,
      high: 2,
      'very-high': 3,
    };
    
    // Try the requested quality first
    const preferredIndex = qualityMap[quality];
    if (preferredIndex !== undefined && urlSource[preferredIndex]) {
      const urlObj = urlSource[preferredIndex];
      const url = urlObj?.url || urlObj?.link || urlObj?.src || (typeof urlObj === 'string' ? urlObj : null);
      if (url) return url;
    }
    
    // Fallback: try to find any valid URL in the array (highest quality first)
    for (let i = urlSource.length - 1; i >= 0; i--) {
      const urlObj = urlSource[i];
      if (urlObj) {
        const url = urlObj?.url || urlObj?.link || urlObj?.src || (typeof urlObj === 'string' ? urlObj : null);
        if (url) return url;
      }
    }
  }
  
  // If it's an object with a URL property
  if (typeof urlSource === 'object' && urlSource !== null) {
    return urlSource.url || urlSource.link || urlSource.src || null;
  }
  
  return null;
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
