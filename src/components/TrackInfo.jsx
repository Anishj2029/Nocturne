import React from 'react';

const TrackInfo = ({ title, artist }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-8 px-4">
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 text-shadow tracking-wide">
        {title}
      </h2>
      <p className="text-sm md:text-base font-sans text-white/80 tracking-widest uppercase text-shadow-sm">
        {artist}
      </p>
    </div>
  );
};

export default TrackInfo;
