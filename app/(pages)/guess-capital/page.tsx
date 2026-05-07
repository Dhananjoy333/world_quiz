'use client'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/react";
import "./guess-capital.css"
import Image from "next/image";

// Types
interface QuestionResponse {
  name: string;
  capital: string;
}

// const API_BASE_URL = import.meta.env.VITE_API_URL;

const GuessCapital: React.FC = () => {
//   const { user } = useUser();
  
//   // Refs for Audio
//   const correctAudio = useRef<HTMLAudioElement | null>(null);
//   const wrongAudio = useRef<HTMLAudioElement | null>(null);
//   const bgMusic = useRef<HTMLAudioElement | null>(null);

  // State
  const [highestScore, setHighestScore] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctAns, setCorrectAns] = useState<number>(0);
  const [wrongAns, setWrongAns] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [countryName, setCountryName] = useState<string>("");
  const [correctCapital, setCorrectCapital] = useState<string>("");
  const [userCapital, setUserCapital] = useState<string>("");
  const [answerStatus, setAnswerStatus] = useState<"correct" | "wrong" | null>(null);
  const [revealedLetters, setRevealedLetters] = useState<number>(0);
  const [hintDisplay, setHintDisplay] = useState<string>("");
  const [isMusicOn, setIsMusicOn] = useState<boolean>(true);

//   // Initialize Audio
//   useEffect(() => {
//     correctAudio.current = new Audio("/sounds/correct.mp3");
//     wrongAudio.current = new Audio("/sounds/error.mp3");
//     bgMusic.current = new Audio("/sounds/lofi1.mp3");
    
//     if (bgMusic.current) {
//       bgMusic.current.loop = true;
//       bgMusic.current.volume = 0.3;
//     }

//     return () => bgMusic.current?.pause();
//   }, []);

//   const fetchNewQuestion = async () => {
//     try {
//       const { data } = await axios.get<QuestionResponse>(`${API_BASE_URL}/question`);
//       setCountryName(data.name?.trim());
//       setCorrectCapital(data.capital);
//     } catch (err) {
//       console.error("Error fetching question:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       axios.get(`${API_BASE_URL}/highscore/capital/${user.id}`)
//         .then(res => setHighestScore(res.data.highScore))
//         .catch(console.error);
//     }
//     fetchNewQuestion();
//   }, [user]);

//   const handleHint = () => {
//     if (!correctCapital || revealedLetters >= correctCapital.length) return;
//     const newReveal = revealedLetters + 1;
//     setRevealedLetters(newReveal);
//     const hint = correctCapital
//       .split("")
//       .map((l, i) => (i < newReveal ? l : "_"))
//       .join(" ");
//     setHintDisplay(hint);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isMusicOn && bgMusic.current?.paused) bgMusic.current.play().catch(() => {});

//     let tempScore = score;
//     let newStreak = streak;

//     if (userCapital.trim().toLowerCase() === correctCapital.trim().toLowerCase()) {
//       setCorrectAns(prev => prev + 1);
//       newStreak = streak + 1;
      
//       const newMult = newStreak >= 10 ? 5 : newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : newStreak >= 2 ? 1.5 : 1;
//       setMultiplier(newMult);
//       tempScore += Math.floor(100 * newMult);
//       setAnswerStatus("correct");
//       if (correctAudio.current) {
//         correctAudio.current.currentTime = 0;
//         correctAudio.current.play();
//       }
//     } else {
//       setWrongAns(prev => prev + 1);
//       newStreak = 0;
//       setMultiplier(1);
//       tempScore -= 100;
//       setAnswerStatus("wrong");
//       if (wrongAudio.current) {
//         wrongAudio.current.currentTime = 0;
//         wrongAudio.current.play();
//       }
//     }

//     setStreak(newStreak);
//     setScore(tempScore);

//     if (tempScore > highestScore && user) {
//       await axios.post(`${API_BASE_URL}/save-score`, {
//         clerkId: user.id,
//         gameMode: "capital",
//         score: tempScore,
//       });
//       setHighestScore(prev => Math.max(prev, tempScore));
//     }

//     setTimeout(() => {
//       setAnswerStatus(null);
//       setRevealedLetters(0);
//       setHintDisplay("");
//       setUserCapital("");
//       fetchNewQuestion();
//     }, 1200);
//   };

  return (
  <div className="relative w-full min-h-screen font-arcade overflow-x-hidden">
    {/* Background Image */}
    <div className="fixed inset-0 -z-10">
      <Image
        src="/assets/mainPage/bg_capital.avif"
        alt="background"
        fill
        className="object-cover pixelated opacity-60 lg:opacity-100"
        priority
      />
    </div>

    {/* Header Controls: Music & Hint */}
    <div className="fixed top-4 left-0 right-0 px-4 flex justify-between items-start z-50 pointer-events-none">
      <div 
        onClick={() => {/* music toggle logic */}}
        className="pointer-events-auto text-2xl md:text-[40px] cursor-pointer bg-black p-2 border-2 border-arcade-cyan rounded-md hover:shadow-[0_0_10px_#00eaff]"
      >
        {isMusicOn ? "🔊" : "🔇"}
      </div>

      {hintDisplay && (
        <div className="pointer-events-auto max-w-[70%] p-2 md:p-3 bg-black text-arcade-yellow border-2 md:border-4 border-arcade-cyan text-sm md:text-[22px] tracking-[2px] md:tracking-[6px] font-bold shadow-[2px_2px_#ff00ff] text-center">
          💡 HINT: {hintDisplay}
        </div>
      )}
    </div>

    {/* Main Game Container */}
    <div className="relative z-20 w-full pt-16 md:mt-20 2xl:mt-60 flex flex-col-reverse lg:flex-row lg:items-start lg:justify-center gap-8 md:gap-14 2xl:gap-16">
      
      {/* left Column: Stats Panel */}
      <div className="2xl:w-full max-w-100 bg-black border-4 border-white arcade-shadow-pink p-4 md:mt-40 md:ml-5 2xl:pt-10 2xl:mt-90 2xl:mr-40 text-white self-center 2xl:self-start relative">
        <h3 className="text-center mb-6 text-sm font-bold 2xl:text-[25px] text-arcade-yellow bg-[#222] p-3 border-2 border-[#444]">SCORE STATS</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm 2xl:text-[17px] border-b-2 border-dashed border-[#333] pb-2">
            <span>Correct</span>
            <span className="text-green-400 text-md 2xl:text-[23px] bg-[#111] px-2 border-2 border-[#333]">{correctAns}</span>
          </div>
          <div className="flex justify-between items-center text-sm 2xl:text-[17px] border-b-2 border-dashed border-[#333] pb-2">
            <span>Wrong</span>
            <span className="text-arcade-red text-md 2xl:text-[23px] bg-[#111] px-2 border-2 border-[#333]">{wrongAns}</span>
          </div>
        </div>
        <div className="hidden lg:block absolute -top-3 -right-3 w-10 h-10 border-r-8 border-t-8 border-arcade-cyan" />
      </div>

      {/* right Column: Game Area */}
      <div className="flex flex-col items-center 2xl:w-full max-w-200">
        
        {/* Top Score Row - bg-black/40 ONLY on mobile */}
        <div className="flex justify-between items-center w-full 2xl:mb-8 p-4 rounded-lg bg-black/40 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
          <div className="text-center">
            <p className="text-[12px] 2xl:text-[20px]">HI-SCORE</p>
            <h1 className="text-green-400 text-2xl 2xl:text-4xl">{highestScore}</h1>
          </div>

          <div className={`text-xl 2xl:text-[32px] text-center animate-pulse ${answerStatus === 'correct' ? 'text-green-400' : 'text-arcade-red'}`}>
            {answerStatus?.toUpperCase()}
          </div>

          <div className="text-center">
            <p className="text-[12px] 2xl:text-[20px]">Current SCORE</p>
            <h1 className="text-arcade-yellow text-2xl 2xl:text-4xl">{score}</h1>
          </div>
        </div>

        {/* Interaction Area */}
        <div className="flex flex-col items-center gap-6 2xl:gap-7.5 w-full">
          <h1 className="text-4xl 2xl:text-[80px] text-white uppercase arcade-text-3d tracking-[5px] text-center">
            India
          </h1>
          
          <input
            type="text"
            className="w-full max-w-125 h-14 2xl:h-17.5 bg-[#111] text-arcade-cyan text-md 2xl:text-[20px] text-center outline-none border-4 border-white arcade-shadow-cyan"
            placeholder="ENTER CAPITAL"
            value={userCapital}
            onChange={(e) => setUserCapital(e.target.value)}
          />

          <button 
            onClick={() => handleSubmit()}
            className="w-full max-w-75 h-13 2xl:h-18.75 text-sm 2xl:text-[22px] bg-arcade-red text-white border-none cursor-pointer shadow-[0_6px_0_#800026] md:shadow-[0_10px_0_#800026] hover:translate-y-0.5 active:translate-y-1.5 transition-all"
          >
            SUBMIT
          </button>

          {/* Powerups Box */}
          <div className="w-full bg-black border-4 border-white arcade-shadow-cyan p-4 2xl:p-5 text-center relative">
             <h3 className="mb-4 2xl:mb-7.5 text-arcade-yellow text-sm 2xl:text-[18px] tracking-[2px]">POWERUPS</h3>
             <div className="flex flex-wrap justify-center gap-3 2xl:gap-5">
                {[
                  { label: "Multiplier", val: `${multiplier}X` },
                  { label: "Hint", val: "💡" },
                  { label: `Streak: ${streak}`, val: "🔥" }
                ].map((p, i) => (
                  <div key={i} className="text-white text-center p-2 w-25 md:w-40 2xl:w-45 bg-white/5 border-2 border-transparent hover:bg-arcade-cyan hover:text-black transition-all cursor-pointer">
                    <p className="text-2xl 2xl:text-[30px] mb-1 2xl:mb-3 drop-shadow-[0_0_5px_#00d9ff]">{p.val}</p>
                    <span className="text-[8px] 2xl:text-[10px] block uppercase">{p.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

    </div>

    {/* Scanline Overlay */}
    <div className="fixed inset-0 pointer-events-none scanlines z-10 opacity-20 md:opacity-30" />
  </div>
);
};

export default GuessCapital;