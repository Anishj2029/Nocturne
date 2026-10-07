import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

const VolumeControl = ({ volume, onVolumeChange }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleMuteToggle = () => {
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      onVolumeChange(0);
    }
  };

  const handleSliderChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
    onVolumeChange(newVolume);
  };

  // Determine which icon to show
  let VolumeIcon = Volume2;
  if (isMuted || volume === 0) {
    VolumeIcon = VolumeX;
  } else if (volume < 50) {
    VolumeIcon = Volume1;
  }

  return (
    <div className="flex items-center w-full max-w-xs mx-auto mt-6 px-4 space-x-4">
      <button 
        onClick={handleMuteToggle}
        className="text-white/70 hover:text-white transition-colors duration-300 outline-none flex-shrink-0"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <VolumeIcon size={20} strokeWidth={2} />
      </button>
      
      <div className="relative flex items-center w-full group h-6">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={isMuted ? 0 : volume} 
          onChange={handleSliderChange}
          className="w-full absolute z-10 opacity-0 cursor-pointer h-full"
          aria-label="Volume"
        />
        {/* Custom progress bar track */}
        <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden pointer-events-none">
          <div 
            className="h-full bg-white/80 rounded-full transition-all duration-75"
            style={{ width: `${isMuted ? 0 : volume}%` }}
          />
        </div>
        {/* Custom thumb */}
        <div 
          className="absolute h-3 w-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transform -translate-x-1/2 pointer-events-none transition-transform duration-200 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
          style={{ left: `${isMuted ? 0 : volume}%` }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
