import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      // Current playback state
      currentSong: null,
      isPlaying: false,
      volume: 1,
      isMuted: false,
      progress: 0,
      duration: 0,
      isShuffled: false,
      repeatMode: 'none', // 'none', 'all', 'one'

      // Queue management
      queue: [],
      currentIndex: 0,
      originalQueue: [],

      // Library
      likedSongs: [],
      recentPlays: [],
      playlists: [],

      // Search history
      searchHistory: [],

      // Theme
      theme: 'dark',

      // Actions
      setCurrentSong: (song) => set({ currentSong: song }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      toggleMute: () => {
        const { isMuted } = get();
        set({ isMuted: !isMuted, volume: isMuted ? 1 : 0 });
      },
      setProgress: (progress) => set({ progress }),
      setDuration: (duration) => set({ duration }),

      // Queue actions
      setQueue: (queue, startIndex = 0) => {
        set({
          queue,
          originalQueue: queue,
          currentIndex: startIndex,
          currentSong: queue[startIndex] || null,
        });
      },

      addToQueue: (song) => {
        const { queue } = get();
        set({ queue: [...queue, song] });
      },

      removeFromQueue: (index) => {
        const { queue, currentIndex } = get();
        const newQueue = queue.filter((_, i) => i !== index);
        const newIndex = index < currentIndex ? currentIndex - 1 : currentIndex;
        set({ queue: newQueue, currentIndex: newIndex });
      },

      playNext: () => {
        const { queue, currentIndex, repeatMode } = get();
        let nextIndex = currentIndex + 1;
        
        if (nextIndex >= queue.length) {
          if (repeatMode === 'all') {
            nextIndex = 0;
          } else if (repeatMode === 'one') {
            nextIndex = currentIndex;
          } else {
            set({ isPlaying: false });
            return;
          }
        }
        
        set({
          currentIndex: nextIndex,
          currentSong: queue[nextIndex],
          isPlaying: true,
        });
      },

      playPrevious: () => {
        const { queue, currentIndex, progress } = get();
        
        // If more than 3 seconds played, restart current song
        if (progress > 3) {
          set({ progress: 0 });
          return;
        }
        
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
        set({
          currentIndex: prevIndex,
          currentSong: queue[prevIndex],
          isPlaying: true,
        });
      },

      toggleShuffle: () => {
        const { isShuffled, queue, originalQueue, currentSong } = get();
        
        if (!isShuffled) {
          // Shuffle the queue
          const shuffled = [...queue];
          const currentSongIndex = shuffled.findIndex(s => s.id === currentSong?.id);
          
          if (currentSongIndex > 0) {
            [shuffled[0], shuffled[currentSongIndex]] = [shuffled[currentSongIndex], shuffled[0]];
          }
          
          for (let i = 1; i < shuffled.length; i++) {
            const j = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          
          set({ queue: shuffled, isShuffled: true, currentIndex: 0 });
        } else {
          // Restore original queue
          const currentSongIndex = originalQueue.findIndex(s => s.id === currentSong?.id);
          set({ 
            queue: originalQueue, 
            isShuffled: false, 
            currentIndex: currentSongIndex >= 0 ? currentSongIndex : 0 
          });
        }
      },

      setRepeatMode: (mode) => set({ repeatMode: mode }),
      
      toggleRepeat: () => {
        const { repeatMode } = get();
        const modes = ['none', 'all', 'one'];
        const currentModeIndex = modes.indexOf(repeatMode);
        const nextMode = modes[(currentModeIndex + 1) % modes.length];
        set({ repeatMode: nextMode });
      },

      // Library actions
      toggleLike: (song) => {
        const { likedSongs } = get();
        const isLiked = likedSongs.some(s => s.id === song.id);
        
        if (isLiked) {
          set({ likedSongs: likedSongs.filter(s => s.id !== song.id) });
        } else {
          set({ likedSongs: [...likedSongs, song] });
        }
      },

      addToRecentPlays: (song) => {
        const { recentPlays } = get();
        const filtered = recentPlays.filter(s => s.id !== song.id);
        set({ recentPlays: [song, ...filtered].slice(0, 50) });
      },

      createPlaylist: (name) => {
        const { playlists } = get();
        const newPlaylist = {
          id: Date.now().toString(),
          name,
          songs: [],
          createdAt: new Date().toISOString(),
        };
        set({ playlists: [...playlists, newPlaylist] });
        return newPlaylist;
      },

      addToPlaylist: (playlistId, song) => {
        const { playlists } = get();
        const updated = playlists.map(p => {
          if (p.id === playlistId) {
            const exists = p.songs.some(s => s.id === song.id);
            if (!exists) {
              return { ...p, songs: [...p.songs, song] };
            }
          }
          return p;
        });
        set({ playlists: updated });
      },

      removeFromPlaylist: (playlistId, songId) => {
        const { playlists } = get();
        const updated = playlists.map(p => {
          if (p.id === playlistId) {
            return { ...p, songs: p.songs.filter(s => s.id !== songId) };
          }
          return p;
        });
        set({ playlists: updated });
      },

      deletePlaylist: (playlistId) => {
        const { playlists } = get();
        set({ playlists: playlists.filter(p => p.id !== playlistId) });
      },

      // Search history
      addToSearchHistory: (query) => {
        const { searchHistory } = get();
        const filtered = searchHistory.filter(q => q !== query);
        set({ searchHistory: [query, ...filtered].slice(0, 10) });
      },

      clearSearchHistory: () => set({ searchHistory: [] }),

      // Theme
      toggleTheme: () => {
        const { theme } = get();
        set({ theme: theme === 'dark' ? 'light' : 'dark' });
      },
    }),
    {
      name: 'music-player-storage',
      partialize: (state) => ({
        volume: state.volume,
        isShuffled: state.isShuffled,
        repeatMode: state.repeatMode,
        likedSongs: state.likedSongs,
        recentPlays: state.recentPlays,
        playlists: state.playlists,
        searchHistory: state.searchHistory,
        theme: state.theme,
      }),
    }
  )
);
