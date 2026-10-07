import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import TrackInfo from './TrackInfo';
import ProgressBar from './ProgressBar';
import PlaybackControls from './PlaybackControls';
import VolumeControl from './VolumeControl';
import AtmosphereBackground from './AtmosphereBackground';

const MusicPlayer = ({ mood }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const playerRef = useRef(null);
  
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };
  
  // Ref to always have the latest isPlaying state in YouTube event callbacks
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  
  const tracks = mood.tracks;
  const currentTrack = tracks[currentTrackIndex];

  // For time tracking since YouTube API doesn't have an event for time update
  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current) {
      interval = setInterval(async () => {
        try {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
        } catch (e) {}
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const onReady = async (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    try {
      const dur = await event.target.getDuration();
      setDuration(dur);
    } catch (e) {}
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onStateChange = async (event) => {
    // YT.PlayerState.UNSTARTED is -1
    // YT.PlayerState.ENDED is 0
    // YT.PlayerState.PLAYING is 1
    // YT.PlayerState.PAUSED is 2
    // YT.PlayerState.CUED is 5
    if (event.data === 0) {
      handleNext();
    } else if (event.data === 1) {
      setIsPlaying(true);
      try {
        const dur = await event.target.getDuration();
        setDuration(dur);
      } catch (e) {}
    } else if (event.data === 5) {
      // When a new video is cued, force play if we are supposed to be playing
      if (isPlayingRef.current) {
        event.target.playVideo();
      }
    }
  };

  const onError = (event) => {
    // Skip to next track on error (e.g. video unavailable)
    changeTrack((currentTrackIndex + 1) % tracks.length, isPlayingRef.current);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const changeTrack = (newIndex, forcePlay = true) => {
    // Reset progress bar immediately
    setCurrentTime(0);
    setDuration(0);
    
    // Change to new track
    setCurrentTrackIndex(newIndex);
    if (forcePlay) {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    changeTrack((currentTrackIndex + 1) % tracks.length, true);
  };

  const handlePrevious = () => {
    changeTrack((currentTrackIndex - 1 + tracks.length) % tracks.length, true);
  };

  const handleSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
    }
  };

  const opts = {
    height: '10',
    width: '10',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
    },
  };

  return (
    <>
      <AtmosphereBackground imageUrl={mood.background} />
      
      {/* Hidden YouTube Player */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
        <YouTube 
          videoId={currentTrack.videoId} 
          opts={opts} 
          onReady={onReady} 
          onStateChange={onStateChange} 
          onError={onError}
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto mt-auto mb-12 py-10 relative z-10 px-8 transition-opacity duration-1000 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <TrackInfo title={currentTrack.title} artist={currentTrack.artist} />
        <ProgressBar 
          currentTime={currentTime} 
          duration={duration} 
          onSeek={handleSeek} 
        />
        <PlaybackControls 
          isPlaying={isPlaying} 
          onTogglePlay={togglePlay} 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
        />
        <VolumeControl 
          volume={volume} 
          onVolumeChange={handleVolumeChange} 
        />
      </div>
    </>
  );
};

export default MusicPlayer;
