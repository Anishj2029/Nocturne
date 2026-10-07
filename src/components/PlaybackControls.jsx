import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const PlaybackControls = ({ isPlaying, onTogglePlay, onNext, onPrevious }) => {
  return (
    <div className="flex items-center justify-center space-x-12 mt-8">
      <button 
        onClick={onPrevious}
        className="text-white/80 hover:text-white transition-colors duration-300 outline-none"
        aria-label="Previous track"
      >
        <SkipBack size={24} strokeWidth={1.5} />
      </button>
      
      <button 
        onClick={onTogglePlay}
        className="flex items-center justify-center w-16 h-16 rounded-full border border-white/30 text-white hover:border-white/80 hover:bg-white/10 transition-all duration-300 outline-none backdrop-blur-sm"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={28} strokeWidth={1.5} className="ml-0.5" />
        ) : (
          <Play size={28} strokeWidth={1.5} className="ml-1.5" />
        )}
      </button>

      <button 
        onClick={onNext}
        className="text-white/80 hover:text-white transition-colors duration-300 outline-none"
        aria-label="Next track"
      >
        <SkipForward size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default PlaybackControls;
