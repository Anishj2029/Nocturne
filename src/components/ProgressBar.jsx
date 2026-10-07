import React from 'react';

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const value = e.target.value;
    const seekTime = (value / 100) * duration;
    onSeek(seekTime);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4 mt-8">
      <div className="w-full relative flex items-center group">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress || 0} 
          onChange={handleSeek}
          className="w-full absolute z-10 opacity-0 cursor-pointer"
          aria-label="Seek time"
        />
        {/* Custom progress bar track */}
        <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/80 rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Custom thumb that appears on hover/active or is always visible but small */}
        <div 
          className="absolute h-2.5 w-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transform -translate-x-1/2 pointer-events-none transition-transform duration-200 group-hover:scale-125"
          style={{ left: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between w-full mt-3 text-xs font-sans text-white/70 tracking-wider">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
