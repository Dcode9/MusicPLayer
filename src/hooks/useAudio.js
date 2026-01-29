import { useState, useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { getDownloadUrl } from '../utils/helpers';
import api from '../services/api';

export const useAudio = () => {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  
  const {
    currentSong,
    isPlaying,
    volume,
    setIsPlaying,
    setProgress,
    setDuration,
    playNext,
    addToRecentPlays,
  } = usePlayerStore();

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsReady(true);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      playNext();
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [setDuration, setIsPlaying, setProgress, playNext]);

  // Handle song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      const audio = audioRef.current;
      
      const loadAndPlaySong = async () => {
        try {
          // First, try to get the download URL from the current song object
          let songUrl = getDownloadUrl(currentSong, 'high');
          
          // If the URL looks like a JioSaavn page URL (not a direct audio file),
          // fetch the song details to get the actual streaming URL
          if (songUrl && (songUrl.includes('jiosaavn.com/song/') || songUrl.includes('www.jiosaavn.com'))) {
            console.log('Fetching song details for streaming URL...');
            
            // Extract song ID from the current song object or URL
            const songId = currentSong.id || currentSong.permaUrl?.split('/').pop();
            
            if (songId) {
              const songDetails = await api.getSongDetails(songId);
              
              // Update the song URL with the actual streaming URL from details
              if (songDetails && songDetails.data && songDetails.data.length > 0) {
                songUrl = getDownloadUrl(songDetails.data[0], 'high');
              }
            }
          }
          
          if (songUrl && !songUrl.includes('jiosaavn.com/song/')) {
            audio.src = songUrl;
            setIsReady(false);
            
            if (isPlaying) {
              await audio.play().catch(err => {
                console.error('Play error:', err);
                setIsPlaying(false);
              });
            }
            
            addToRecentPlays(currentSong);
          } else {
            console.error('No valid audio streaming URL found for song:', currentSong);
            console.error('Download URL returned:', songUrl);
          }
        } catch (error) {
          console.error('Error loading song:', error);
          setIsPlaying(false);
        }
      };
      
      loadAndPlaySong();
    }
  }, [currentSong, addToRecentPlays, isPlaying, setIsPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current && isReady) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Play error:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isReady, setIsPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return {
    audioRef,
    isReady,
    seek,
  };
};
