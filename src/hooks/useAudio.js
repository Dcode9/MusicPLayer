import { useState, useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';

export const useAudio = () => {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
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
      
      // Get the download URL from the song data
      const songUrl = currentSong.downloadUrl?.[4]?.link || 
                      currentSong.downloadUrl?.[3]?.link || 
                      currentSong.downloadUrl?.[2]?.link ||
                      currentSong.downloadUrl?.[1]?.link ||
                      currentSong.downloadUrl?.[0]?.link;
      
      if (songUrl) {
        audio.src = songUrl;
        setIsReady(false);
        
        if (isPlaying) {
          audio.play().catch(err => {
            console.error('Play error:', err);
            setIsPlaying(false);
          });
        }
        
        addToRecentPlays(currentSong);
      }
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
