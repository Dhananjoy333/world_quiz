'use client'
import GameModeCard from "@/components/GameModeCard";
import Leaderboard from "@/components/Leaderboard";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface Player {
  id: string | number
  username: string
  total_score: number
}

export default function Home() {

  const [highestScoreGuessCountry, setHighestScoreGuessCountry] = useState(0)
  const [highestScoreGuessCapital, setHighestScoreGuessCapital] = useState(0)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [isMusicOn, setIsMusicOn] = useState(false)
  const bgmusic = useRef<HTMLAudioElement | null>(null)

  //function to get leaderboard data
    function fetchLeaderboard(){
      axios
        .get(`/api/leaderboard`)
        .then(res => {
          setLeaderboard(res.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
      fetchLeaderboard()
    },[])

  useEffect(() => {
    bgmusic.current = new Audio("/assets/sounds/lofi3.mp3")

    bgmusic.current.loop = true
    bgmusic.current.volume = 0.3

    return () => {
      bgmusic.current?.pause()
    }
  }, [])

  function toggleMusic(){
    if(isMusicOn){
      bgmusic.current.pause()
    }else{
      bgmusic.current.play().catch(()=>{})
    }
    setIsMusicOn(!isMusicOn)
  }

  return (
    <div className="main-page min-h-screen relative font-gaming overflow-x-hidden">
      <div className="music-box" onClick={toggleMusic}>
      {isMusicOn ? "🔊" : "🔇"}
    </div>
      <Image
        src="/assets/mainPage/background.avif"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />
      <Navbar />
      <div className="mt-16 md:mt-28 2xl:mt-35 text-center px-4">
        {/* HERO TITLE */}
        <div className="hero-title flex flex-wrap items-center justify-center font-gaming text-[#fde047]">
          WORLD{" "}
          <span className="text-[1.2em] md:text-[1.1em] 2xl:mb-8 md:mb-4">
            🌍
          </span>{" "}
          QUIZ
        </div>

        {/* MODE BANNER */}
        <div className="mode-banner relative mt-10 inline-block bg-[#1e293b]">
          <p className="m-0 animate-retro-pulse font-gaming whitespace-nowrap text-xs md:text-2xl 2xl:text-2xl tracking-[2px] md:tracking-[4px] 2xl:tracking-[6px]"
          >
            SELECT A GAME MODE
          </p>
        </div>
      </div>

      <main className="flex flex-col md:flex-row gap-8 2xl:gap-20 mt-20 justify-center items-center">
        <GameModeCard
          navigate = '/guess-country'
          icon="🏳️"
          title="FLAG QUIZ"
          description="Identify nations by their flags."
          highScore="0000"
        />
        <GameModeCard
          navigate = 'guess-capital'
          icon="🌆"
          title="CAPITAL QUIZ"
          description="Test your knowledge of country capitals."
          highScore="0000"
        />
        <GameModeCard
          isComingSoon={true}
        />
        
      </main>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}
