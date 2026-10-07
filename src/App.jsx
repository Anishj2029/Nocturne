import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import { moods } from './data/moods';
import { Moon } from 'lucide-react';

function App() {
  const currentMood = moods.lateNight;

  return (
    <div className="min-h-screen w-full flex flex-col relative font-sans text-white">

      {/* Top Left Branding */}
      <header className="absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none select-none mix-blend-screen text-white/90 flex flex-col items-center">
        <div className="mb-2 opacity-80">
          <Moon size={24} strokeWidth={1} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif italic mb-1 tracking-wider text-shadow">
          Nocturne
        </h1>
        <p className="text-xs md:text-sm tracking-[0.2em] font-sans lowercase text-white/70 text-shadow-sm">
          music for quiet hours
        </p>
      </header>

      {/* Main Player Area */}
      <main className="flex-grow flex flex-col justify-end w-full">
        <MusicPlayer mood={currentMood} />
      </main>

    </div>
  );
}

export default App;
