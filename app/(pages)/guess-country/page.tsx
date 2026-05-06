'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface GameProps {
  highestScore: number;
  score: number;
  CorrectAns: number;
  WrongAns: number;
  streak: number;
  multiplier: number;
  flag: string | null;
  isMusicOn: boolean;
  toggleMusic: () => void;
  handleSubmit: () => void;
  answerStatus: 'correct' | 'wrong' | 'idle';
}

const GuessCountry: React.FC<GameProps> = ({
  highestScore, score, CorrectAns, WrongAns, streak, 
  multiplier, flag, isMusicOn, toggleMusic, handleSubmit, answerStatus
}) => {
  const [userInput, setUserInput] = useState('');

  return (
    <div className="relative min-h-screen w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] items-start justify-items-center p-10 pt-24 gap-8 font-pixel text-white box-border">
      
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image 
          src="/assets/mainPage/bg_country.avif" 
          alt="background" 
          fill 
          className="object-cover pixelated"
          priority
        />
      </div>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed top-5 left-5 text-3xl cursor-pointer bg-black p-2 border-2 border-[#00eaff] rounded-md z-50 hover:shadow-[0_0_10px_#00eaff] transition-shadow"
      >
        {isMusicOn ? "🔊" : "🔇"}
      </button>

      {/* Left Panel: Statistics */}
      <aside className="pixel-border w-full max-w-112.5 bg-retro-blue-dark p-5 shadow-[8px_8px_0px_#000] flex flex-col gap-4">
        <h2 className="text-2xl lg:text-3xl text-retro-yellow text-center mb-2 drop-shadow-[4px_4px_0px_#cf5a00]">
          STATISTICS
        </h2>
        
        <div className="bg-retro-blue-mid border-4 border-[#2b6d88] p-4 text-center">
          <div className="text-5xl mb-2 filter saturate-150 drop-shadow-[2px_2px_0px_#000]">👑</div>
          <p className="text-sm lg:text-base text-retro-blue-light mb-4">HIGHEST SCORE</p>
          <h1 className="text-2xl lg:text-4xl text-retro-yellow m-0">11111</h1>
        </div>

        <div className="bg-[#07151d] p-5 border-3 border-[#2f5d73] flex flex-col gap-4">
          <p className="text-sm lg:text-base text-[#8ab6cc]">GAME METRICS</p>
          <span className="text-sm lg:text-base">
            Current Score: <b className="text-retro-green text-xl lg:text-3xl">12</b>
          </span>
        </div>

        <div className="flex gap-5">
          <div className="flex-1 p-2 text-sm lg:text-base text-center uppercase bg-[#0e2c20] text-[#29ff8a] border-4 border-[#29ff8a] border-r-[#1a8f50] border-b-[#1a8f50]">
             ✔ Correct: correct
          </div>
          <div className="flex-1 p-2 text-sm lg:text-base text-center uppercase bg-[#2c1111] text-retro-red border-4 border-retro-red border-r-[#8f2a2a] border-b-[#8f2a2a]">
             ✖ Wrong: wrong
          </div>
        </div>

        <div className="mt-4 p-4 bg-white/5 border border-white/15 backdrop-blur-md flex flex-col gap-5">
          <div className="text-lg text-[#ffd166] font-semibold">
            🔥 Streak: <b>streak</b>
          </div>
          <div className="bg-white/5 p-5 text-center rounded-lg">
            <p className="text-2xl font-bold text-[#06d6a0] pb-3">2X</p>
            <span className="text-sm text-gray-400">Score Multiplier</span>
          </div>
        </div>
      </aside>

      {/* Middle Section: Game Play */}
      <main className="flex flex-col items-center gap-6 w-full max-w-125">
        <div className="bg-black w-76 h-76 relative p-2 border-6 border-white shadow-[10px_10px_0px_rgba(0,0,0,0.5)] flex justify-center items-center">

            <Image 
              fill
              src={`/countryFlags/ad.svg`} 
              alt="country flag" 
              className="w-full max-w-100 h-auto pixelated block"
            />

        </div>

        <input
          type="text"
          placeholder="Enter the country name..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full bg-[#07151d] border-4 border-retro-blue-light p-4 text-retro-green text-xl lg:text-2xl text-center outline-none uppercase focus:border-white focus:ring-4 focus:ring-retro-green/50 placeholder:text-[#2f5d73] placeholder:text-sm"
        />

        <button 
          onClick={handleSubmit}
          className="cursor-pointer bg-retro-yellow text-black px-10 py-4 text-xl font-bold border-b-6 border-r-6 border-[#cf5a00] border-t-6 border-l-6 active:translate-y-1 active:border-b-2 active:border-r-2"
        >
          SUBMIT ✓
        </button>

        <div className="h-8">
          {answerStatus === 'correct' && (
            <p className="text-retro-green text-xl animate-pixel-blink drop-shadow-[4px_4px_0px_#000]">Correct</p>
          )}
          {answerStatus === 'wrong' && (
            <p className="text-retro-red text-xl animate-pixel-blink drop-shadow-[4px_4px_0px_#000]">Wrong</p>
          )}
        </div>
      </main>

      {/* Right Panel: Intelligence */}
      <aside className="pixel-border w-full max-w-112.5 bg-retro-blue-dark p-5 shadow-[-8px_8px_0px_#000] flex flex-col gap-4">
        <h2 className="text-2xl lg:text-3xl text-[#00f2ff] text-center mb-1 drop-shadow-[3px_3px_0px_#005a61]">
          INTELLIGENCE
        </h2>

        <div className="bg-[#132f40] p-4 border-4 border-[#2b6d88]">
          <p className="text-xl lg:text-2xl text-retro-blue-light mb-3">HINTS</p>
          <div className="flex flex-row gap-4 justify-between">
            <button className="flex-1 aspect-square bg-[#2b6d88] border-b-6 border-r-6 border-[#07151d] border-t-4 border-l-4 flex flex-col items-center justify-center gap-3 p-2 hover:bg-[#3e8eb1] active:translate-x-1 active:translate-y-1 active:border-b-2 active:border-r-2">
              <span className="text-4xl">💡</span>
              <span className="text-[10px] lg:text-[12px] text-center leading-tight">Reveal Fact</span>
            </button>
            <button className="flex-1 aspect-square bg-[#2b6d88] border-b-6 border-r-6 border-[#07151d] border-t-4 border-l-4 flex flex-col items-center justify-center gap-3 p-2 hover:bg-[#3e8eb1] active:translate-x-1 active:translate-y-1 active:border-b-2 active:border-r-2">
              <span className="text-4xl">🌍</span>
              <span className="text-[10px] lg:text-[12px] text-center leading-tight">Reveal Continent</span>
            </button>
          </div>
        </div>

        <div className="bg-[#07151d] border-2 border-dashed border-[#00f2ff] p-4 grow overflow-y-auto max-h-62.5 custom-scrollbar">
          <h3 className="text-lg lg:text-xl text-retro-yellow mb-4">DID YOU KNOW?</h3>
          <p className="text-xs lg:text-sm leading-relaxed text-retro-green">
            ???
          </p>
        </div>
      </aside>
    </div>
  );
};

export default GuessCountry;