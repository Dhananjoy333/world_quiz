"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./guess-country.css";

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
  answerStatus: "correct" | "wrong" | "idle";
}

const GuessCountry: React.FC<GameProps> = ({
  highestScore,
  score,
  CorrectAns,
  WrongAns,
  streak,
  multiplier,
  flag,
  isMusicOn,
  toggleMusic,
  handleSubmit,
  answerStatus,
}) => {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr_1fr] 2xl:grid-cols-[1.2fr_1.5fr_1.2fr] items-start justify-items-center px-4 md:px-10 lg:px-12 2xl:px-80 py-10 2xl:mt-24 font-pixel text-white box-border gap-8">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/mainPage/bg_country.avif"
          alt="background"
          fill
          className="object-cover pixelated opacity-60 lg:opacity-100"
          priority
        />
      </div>

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 lg:left-5 lg:right-auto text-2xl lg:text-3xl cursor-pointer bg-black p-2 border-2 border-[#00eaff] rounded-md z-50 hover:shadow-[0_0_10px_#00eaff] transition-shadow"
      >
        {isMusicOn ? "🔊" : "🔇"}
      </button>

      {/* Left Panel: Statistics */}
      <aside className="pixel-border w-full max-w-md lg:max-w-none bg-retro-blue-dark p-4 lg:p-5 shadow-[8px_8px_0px_#000] flex flex-col gap-4 order-2 lg:order-1 2xl:scale-100 origin-top">
        <h2 className="text-xl 2xl:text-3xl text-retro-yellow text-center mb-2 drop-shadow-[4px_4px_0px_#cf5a00]">
          STATISTICS
        </h2>

        <div className="bg-retro-blue-mid border-4 border-[#2b6d88] p-4 text-center">
          <div className="text-3xl 2xl:text-5xl mb-2 filter saturate-150 drop-shadow-[2px_2px_0px_#000]">
            👑
          </div>
          <p className="text-xs 2xl:text-base text-retro-blue-light mb-2">
            HIGHEST SCORE
          </p>
          <h1 className="text-xl 2xl:text-4xl text-retro-yellow m-0">
            {highestScore}
          </h1>
        </div>

        <div className="bg-[#07151d] p-4 lg:p-5 border-3 border-[#2f5d73] flex flex-col gap-2 lg:gap-4">
          <p className="text-xs 2xl:text-base text-[#8ab6cc]">GAME METRICS</p>
          <span className="text-sm 2xl:text-base">
            Current Score:{" "}
            <b className="text-retro-green text-lg 2xl:text-3xl">{score}</b>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-5">
          <div className="p-2 2xl:p-8 text-[10px] 2xl:text-sm text-center uppercase bg-[#0e2c20] text-[#29ff8a] border-4 border-[#29ff8a] border-r-[#1a8f50] border-b-[#1a8f50]">
            ✔ Correct : {CorrectAns}
          </div>
          <div className="p-2 2xl:p-8 text-[10px] 2xl:text-sm text-center uppercase bg-[#2c1111] text-retro-red border-4 border-retro-red border-r-[#8f2a2a] border-b-[#8f2a2a]">
            ✖ Wrong :{WrongAns}
          </div>
        </div>

        <div className="mt-2 p-3 lg:p-4 bg-white/5 border border-white/15 backdrop-blur-md flex flex-row lg:flex-col justify-between items-center lg:items-stretch gap-4">
          <div className="text-sm 2xl:text-lg text-[#ffd166] font-semibold">
            🔥 Streak: <b>{streak}</b>
          </div>
          <div className="bg-white/5 p-2 lg:p-5 text-center rounded-lg flex-1 lg:flex-none">
            <p className="text-lg 2xl:text-2xl font-bold text-[#06d6a0]">
              {multiplier}X
            </p>
            <span className="hidden lg:block text-xs text-gray-400">
              Multiplier
            </span>
          </div>
        </div>
      </aside>

      {/* Middle Section: Game Play */}
      <main className="flex flex-col items-center gap-6 w-full max-w-md lg:max-w-xl order-1 lg:order-2 2xl:scale-110">
        <div className="bg-black w-55 aspect-video h-45 2xl:w-100 2xl:h-76 relative p-2 border-4 lg:border-6 border-white shadow-[10px_10px_0px_rgba(0,0,0,0.5)] flex justify-center items-center">
          <Image
            fill
            src="/countryFlags/ad.svg"
            alt="country flag"
            className="w-full h-full object-contain pixelated p-2"
          />
        </div>

        <input
          type="text"
          placeholder="Enter country..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full bg-[#07151d] border-4 border-retro-blue-light p-3 lg:p-4 text-retro-green text-lg 2xl:text-2xl text-center outline-none uppercase focus:border-white focus:ring-4 focus:ring-retro-green/50 placeholder:text-[#2f5d73] placeholder:text-xs lg:placeholder:text-sm"
        />

        <button
          className="w-55 h-16 2xl:w-75
    2xl:h-18.75

    font-['Press_Start_2P']
    text-[22px]
    text-white

    cursor-pointer
    relative

    bg-[#ff004c]

    border-none

    shadow-[0_10px_0_rgb(128,0,38),0_10px_20px_rgba(0,0,0,0.5)]

    active:translate-x-[2px]
    active:translate-y-[2px]
    active:border-b-3
    active:border-r-3"
        >
          SUBMIT ✓
        </button>

        <div className="h-8">
          {answerStatus === "correct" && (
            <p className="text-retro-green text-lg 2xl:text-xl animate-pixel-blink drop-shadow-[2px_2px_0px_#000]">
              CORRECT!
            </p>
          )}
          {answerStatus === "wrong" && (
            <p className="text-retro-red text-lg 2xl:text-xl animate-pixel-blink drop-shadow-[2px_2px_0px_#000]">
              WRONG!
            </p>
          )}
        </div>
      </main>

      {/* Right Panel: Intelligence */}
      <aside className="pixel-border w-full max-w-md lg:max-w-none bg-retro-blue-dark p-4 lg:p-5 shadow-[8px_8px_0px_#000] lg:shadow-[-8px_8px_0px_#000] flex flex-col gap-4 order-3 2xl:scale-110 origin-top">
        <h2 className="text-xl 2xl:text-3xl text-[#00f2ff] text-center mb-1 drop-shadow-[3px_3px_0px_#005a61]">
          INTELLIGENCE
        </h2>

        <div className="bg-[#132f40] p-3 lg:p-4 border-4 border-[#2b6d88]">
          <p className="text-base 2xl:text-2xl text-retro-blue-light mb-3">
            HINTS
          </p>
          <div className="flex flex-row gap-4 justify-between">
            <button
              className=" flex-1 aspect-square bg-[#2b6d88]

    border-t-4 border-l-4
    border-b-4 lg:border-b-6
    border-r-4 lg:border-r-6

    border-t-[#4da9cc]
    border-l-[#4da9cc]
    border-b-[#07151d]
    border-r-[#07151d]

    flex flex-col items-center justify-center
    gap-1 lg:gap-3 p-2

    hover:bg-[#3e8eb1]
    active:translate-x-1 active:translate-y-1"
            >
              <span className="text-2xl 2xl:text-4xl">💡</span>
              <span className="text-[10px] 2xl:text-[12px] text-center leading-tight">
                Reveal Fact
              </span>
            </button>
            <button
              className=" flex-1 aspect-square bg-[#2b6d88]

    border-t-4 border-l-4
    border-b-4 lg:border-b-6
    border-r-4 lg:border-r-6

    border-t-[#4da9cc]
    border-l-[#4da9cc]
    border-b-[#07151d]
    border-r-[#07151d]

    flex flex-col items-center justify-center
    gap-1 lg:gap-3 p-2

    hover:bg-[#3e8eb1]
    active:translate-x-1 active:translate-y-1"
            >
              <span className="text-2xl 2xl:text-4xl">🌍</span>
              <span className="text-[10px] 2xl:text-[12px] text-center leading-tight">
                Continent
              </span>
            </button>
          </div>
        </div>

        <div className="bg-retro-blue-darkest border-2 border-dashed border-[#00f2ff] p-4 grow min-h-37.5 max-h-60 overflow-y-auto custom-scrollbar">
          <h3 className="text-base 2xl:text-xl text-retro-yellow mb-2">
            DID YOU KNOW?
          </h3>
          <p className="text-xs 2xl:text-sm leading-relaxed text-retro-green">
            Select a hint to reveal information about this country.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default GuessCountry;
