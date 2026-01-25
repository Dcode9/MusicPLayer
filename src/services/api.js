// Alternative JioSaavn API endpoints
// If one fails, you can try switching to another by changing API_BASE_URL
const API_ENDPOINTS = {
  primary: 'https://saavn.dev',  // Most reliable endpoint
  fallback1: 'https://jiosaavn-api.vercel.app',
  fallback2: 'https://jiosaavn-api-privatecvc.vercel.app',  // Has CORS issues
  original: 'https://saavan-api-psi.vercel.app', // Currently returning 500 errors
};

// Change this to use a different endpoint if primary fails
const API_BASE_URL = API_ENDPOINTS.primary;

class ApiService {
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Search endpoints
  async globalSearch(query) {
    return this.fetchData(`/api/search?query=${encodeURIComponent(query)}`);
  }

  async searchSongs(query, page = 1, limit = 20) {
    return this.fetchData(`/api/search/songs?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  }

  async searchAlbums(query) {
    return this.fetchData(`/api/search/albums?query=${encodeURIComponent(query)}`);
  }

  async searchArtists(query) {
    return this.fetchData(`/api/search/artists?query=${encodeURIComponent(query)}`);
  }

  async searchPlaylists(query) {
    return this.fetchData(`/api/search/playlists?query=${encodeURIComponent(query)}`);
  }

  // Song endpoints
  async getSongDetails(id) {
    return this.fetchData(`/api/songs/${id}`);
  }

  async getSongLyrics(id) {
    return this.fetchData(`/api/songs/${id}/lyrics`);
  }

  async getSongSuggestions(id) {
    return this.fetchData(`/api/songs/${id}/suggestions`);
  }

  // Album & Artist endpoints
  async getAlbumDetails(id) {
    return this.fetchData(`/api/albums?id=${id}`);
  }

  async getArtistDetails(id) {
    return this.fetchData(`/api/artists?id=${id}`);
  }

  async getArtistSongs(id) {
    return this.fetchData(`/api/artists/${id}/songs`);
  }

  async getArtistAlbums(id) {
    return this.fetchData(`/api/artists/${id}/albums`);
  }
}

export default new ApiService();
