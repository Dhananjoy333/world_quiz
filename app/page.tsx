import GameModeCard from "@/components/GameModeCard";
import Leaderboard from "@/components/Leaderboard";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {

  const leaderboardData = [
    { id: '1', username: "ARCADE_MASTER", total_score: 125400 },
    { id: '2', username: "PIXEL_LORD", total_score: 98200 },
    { id: '3', username: "SYNTH_WAVE", total_score: 87500 },
  ];

  return (
    <div className="main-page min-h-screen relative font-gaming overflow-x-hidden">
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

      <main className="flex flex-col md:flex-row gap-8 mt-20 justify-center items-center">
        <GameModeCard
          icon="🏳️"
          title="FLAG QUIZ"
          description="Identify nations by their flags."
          highScore="0000"
        />
        <GameModeCard
          icon="🏳️"
          title="FLAG QUIZ"
          description="Identify nations by their flags."
          highScore="0000"
        />
        <GameModeCard
          icon="🏳️"
          title="FLAG QUIZ"
          description="Identify nations by their flags."
          highScore="0000"
        />
        <GameModeCard
          icon="🏳️"
          title="FLAG QUIZ"
          description="Identify nations by their flags."
          highScore="0000"
        />
      </main>
      <Leaderboard leaderboard={leaderboardData} />
    </div>
  );
}
