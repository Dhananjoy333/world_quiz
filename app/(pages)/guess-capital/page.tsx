"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/react";
import "./guess-capital.css";
import Image from "next/image";
import { useScoreStore } from "@/store/useScoreStore";
import toast from "react-hot-toast";

const GuessCapital: React.FC = () => {
  const correctAudio = useRef<HTMLAudioElement | null>(null);
  const wrongAudio = useRef<HTMLAudioElement | null>(null);
  const bgmusic = useRef<HTMLAudioElement | null>(null);

  const { user } = useUser();

  // State
  const { capitalHighScore, setCapitalHighScore } = useScoreStore();
  const [score, setScore] = useState<number>(0);
  const [correctAns, setCorrectAns] = useState<number>(0);
  const [wrongAns, setWrongAns] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [countryName, setCountryName] = useState<string>("");
  const [correctCapital, setCorrectCapital] = useState<string>("");
  const [userCapital, setUserCapital] = useState<string>("");
  const [answerStatus, setAnswerStatus] = useState(null);
  const [revealedLetters, setRevealedLetters] = useState<number>(0);
  const [hintDisplay, setHintDisplay] = useState<string>("");
  const [isMusicOn, setIsMusicOn] = useState<boolean>(true);

  const getQuestion = async () => {
    try {
      const res = await axios.get("/api/country");
      setCountryName(res.data.country);
      setCorrectCapital(res.data.capital);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (!user) {
    toast("Playing as guest. Scores won't be saved.", {
      id: "guest-mode",
    });
  }
}, [user]);

  //fetching country name data from backend
  useEffect(() => {
    const fetchQuestion = async () => {
      await getQuestion();
    };
    fetchQuestion();
  }, []);

  //shows hint
  function handleHint() {
    if (!correctCapital) return;
    if (revealedLetters >= correctCapital.length) return;

    const newReveal = revealedLetters + 1;
    setRevealedLetters(newReveal);

    const hint = correctCapital
      .split("")
      .map((letter, index) => (index < newReveal ? letter : "_"))
      .join(" ");

    setHintDisplay(hint);
  }

  function startMusic() {
    if (isMusicOn && bgmusic.current.paused) {
      bgmusic.current.play().catch(() => {});
    }
  }

  //submit logic
  const handleSubmit = async (event) => {
    event.preventDefault();

    let newStreak = streak;
    let tempScore = score;
    startMusic();
    if (
      userCapital.trim().toLowerCase() === correctCapital.trim().toLowerCase()
    ) {
      setCorrectAns((prevScore) => prevScore + 1);

      newStreak = streak + 1;
      setStreak(newStreak);

      let newMultiplier = 1;
      if (newStreak >= 10) newMultiplier = 5;
      else if (newStreak >= 5) newMultiplier = 3;
      else if (newStreak >= 3) newMultiplier = 2;
      else if (newStreak >= 2) newMultiplier = 1.5;
      setMultiplier(newMultiplier);

      setAnswerStatus("correct");
      tempScore = tempScore + 100;
      correctAudio.current?.pause();
      correctAudio.current.currentTime = 0;
      correctAudio.current?.play();
    } else {
      setWrongAns((prevScore) => prevScore + 1);
      setStreak(0);
      setMultiplier(1);
      setAnswerStatus("wrong");
      tempScore = tempScore - 100;
      wrongAudio.current?.pause();
      wrongAudio.current.currentTime = 0;
      wrongAudio.current?.play();
    }
    setScore(tempScore);

    //if score earned in session is higher than highestScore store in db
    if (user && tempScore > capitalHighScore) {
      await axios.post(`api/save-score`, {
        clerkId: user.id,
        gameMode: "capital",
        score: tempScore,
      });
      setCapitalHighScore(Math.max(capitalHighScore, tempScore))
    }

      setRevealedLetters(0);
      setHintDisplay("");
      setUserCapital(""); // Clear input after submission
      getQuestion(); // Get new Question
  };

  // Initialize Audio
  useEffect(() => {
      correctAudio.current = new Audio("/assets/sounds/correct.mp3");
      wrongAudio.current = new Audio("/assets/sounds/error.mp3");
      bgmusic.current = new Audio("/assets/sounds/lofi3.mp3");
  
      if (bgmusic.current) {
        bgmusic.current.loop = true;
        bgmusic.current.volume = 0.3;
      }
  
      return () => {
        correctAudio.current?.pause();
        wrongAudio.current?.pause();
        bgmusic.current?.pause();
      };
    }, []);
  
    function toggleMusic() {
      if (!bgmusic.current) return;
      if (isMusicOn) {
        bgmusic.current.pause();
      } else {
        bgmusic.current
          .play()
          .catch((err) => console.log("Audio play failed:", err));
      }
      setIsMusicOn(!isMusicOn);
    }

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
          onClick={toggleMusic}
          className="pointer-events-auto text-md md:text-[30px] cursor-pointer bg-black p-2 border-2 border-arcade-cyan rounded-md hover:shadow-[0_0_10px_#00eaff]"
        >
          {isMusicOn ? "🔊" : "🔇"}
        </div>

        {hintDisplay && (
          <div className="pointer-events-auto absolute left-20 md:left-160 md:top-20 2xl:left-330 2xl:top-56 max-w-[70%] p-2 md:p-3 bg-black text-arcade-yellow border-2 2xl:border-4 border-arcade-cyan text-[10px] 2xl:text-[22px] tracking-[2px] 2xl:tracking-[6px] font-bold shadow-[2px_2px_#ff00ff] text-center">
            💡 HINT: {hintDisplay}
          </div>
        )}
      </div>

      {/* Main Game Container */}
      <div className="relative z-20 w-full pt-16 md:mt-20 2xl:mt-60 flex flex-col-reverse lg:flex-row lg:items-start lg:justify-center gap-8 md:gap-14 2xl:gap-16">
        {/* left Column: Stats Panel */}
        <div className="2xl:w-full max-w-100 bg-black border-4 border-white arcade-shadow-pink p-4 md:mt-40 md:ml-5 2xl:pt-10 2xl:mt-90 2xl:mr-40 text-white self-center 2xl:self-start relative">
          <h3 className="text-center mb-6 text-sm font-bold 2xl:text-[25px] text-arcade-yellow bg-[#222] p-3 border-2 border-[#444]">
            SCORE STATS
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm 2xl:text-[17px] border-b-2 border-dashed border-[#333] pb-2">
              <span>Correct</span>
              <span className="text-green-400 text-md 2xl:text-[23px] bg-[#111] px-2 border-2 border-[#333]">
                {correctAns}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm 2xl:text-[17px] border-b-2 border-dashed border-[#333] pb-2">
              <span>Wrong</span>
              <span className="text-arcade-red text-md 2xl:text-[23px] bg-[#111] px-2 border-2 border-[#333]">
                {wrongAns}
              </span>
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
              <h1 className="text-green-400 text-2xl 2xl:text-4xl">
                {capitalHighScore}
              </h1>
            </div>

            <div
              className={`text-xl 2xl:text-[32px] text-center animate-pulse ${answerStatus === "correct" ? "text-green-400" : "text-arcade-red"}`}
            >
              {answerStatus?.toUpperCase()}
            </div>

            <div className="text-center">
              <p className="text-[12px] 2xl:text-[20px]">Current SCORE</p>
              <h1 className="text-arcade-yellow text-2xl 2xl:text-4xl">
                {score}
              </h1>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="flex flex-col items-center gap-6 2xl:gap-7.5 w-full">
            <h1 className="text-4xl 2xl:text-[80px] text-white uppercase arcade-text-3d tracking-[5px] text-center">
              {countryName}
            </h1>

            <input
              type="text"
              className="w-full max-w-125 h-14 2xl:h-17.5 bg-[#111] text-arcade-cyan text-md 2xl:text-[20px] text-center outline-none border-4 border-white arcade-shadow-cyan"
              placeholder="ENTER CAPITAL"
              value={userCapital}
              onChange={(e) => setUserCapital(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="w-full max-w-75 h-13 2xl:h-18.75 text-sm 2xl:text-[22px] bg-arcade-red text-white border-none cursor-pointer shadow-[0_6px_0_#800026] md:shadow-[0_10px_0_#800026] hover:translate-y-0.5 active:translate-y-1.5 transition-all"
            >
              SUBMIT
            </button>

            {/* Powerups Box */}
            <div className="w-full bg-black border-4 border-white arcade-shadow-cyan p-4 2xl:p-5 text-center relative">
              <h3 className="mb-4 2xl:mb-7.5 text-arcade-yellow text-sm 2xl:text-[18px] tracking-[2px]">
                POWERUPS
              </h3>
              <div className="flex flex-wrap justify-center gap-3 2xl:gap-5">
                {[
                  { label: "Multiplier", val: `${multiplier}X` },
                  { label: "Hint", val: "💡", onClick: handleHint },
                  { label: `Streak: ${streak}`, val: "🔥" },
                ].map((p, i) => (
                  <div
                    key={i}
                    onClick={p.onClick}
                    className="text-white text-center p-2 w-25 md:w-40 2xl:w-45 bg-white/5 border-2 border-transparent hover:bg-arcade-cyan hover:text-black transition-all cursor-pointer"
                  >
                    <p className="text-2xl 2xl:text-[30px] mb-1 2xl:mb-3 drop-shadow-[0_0_5px_#00d9ff]">
                      {p.val}
                    </p>
                    <span className="text-[8px] 2xl:text-[10px] block uppercase">
                      {p.label}
                    </span>
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
