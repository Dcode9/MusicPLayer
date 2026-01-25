// JioSaavn API endpoints
// IMPORTANT: These are third-party hosted APIs that may go down or change
// If you encounter errors, try these alternatives in order:

const API_ENDPOINTS = {
  // Option 1: Try this first (from original problem statement)
  primary: 'https://saavan-api-psi.vercel.app',
  
  // Option 2: Alternative public APIs (try if primary fails)
  fallback1: 'https://jiosaavn-api-privatecvc.vercel.app',
  fallback2: 'https://saavn.dev',
  fallback3: 'https://jiosaavn-api.vercel.app',
  
  // Self-hosted option: If all public APIs are down, you can deploy your own
  // using: https://github.com/sumitkolhe/jiosaavn-api
  // selfHosted: 'https://your-api-domain.vercel.app',
};

// Change this line to switch between API endpoints
// Example: const API_BASE_URL = API_ENDPOINTS.fallback1;
const API_BASE_URL = API_ENDPOINTS.primary;

// Note: If you're getting ERR_NAME_NOT_RESOLVED or DNS errors, the API endpoint
// may be down. Try switching to a different endpoint above.

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
