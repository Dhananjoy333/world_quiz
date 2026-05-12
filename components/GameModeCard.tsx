import React from "react";
import Link from "next/link";

interface GameModeCardProps {
  icon?: string;
  title?: string;
  description?: string;
  highScore?: number;
  isComingSoon?: boolean;
  onStart?: () => void;
  navigate?: `/${string}`;
}

const GameModeCard: React.FC<GameModeCardProps> = ({
  icon,
  title,
  description,
  highScore = 0,
  isComingSoon,
  navigate,
}) => {
  // Coming Soon State
  if (isComingSoon) {
    return (
      <div className="arcade-cabinet-transition relative flex w-75 flex-col border-4 border-black bg-slate-900 shadow-[10px_10px_0px_rgba(0,0,0,0.3)] grayscale-[0.8] opacity-80 2xl:w-95">
        <div className="flex h-10 items-center justify-center border-b-4 border-black bg-slate-700 px-2 md:h-12.5">
          <span className="hi-score-glow font-['Press_Start_2P'] text-[8px] text-amber-400 md:text-[10px]">
            OFFLINE
          </span>
        </div>

        <div className="relative m-2 flex h-35 items-center justify-center overflow-hidden border-4 border-slate-700 bg-black md:m-3.75 md:h-50">
          <div className="absolute z-10 rotate-[-15deg] border-2 border-dashed border-black bg-yellow-400 px-5 py-2 font-['Press_Start_2P'] text-[10px] text-black shadow-[4px_4px_0_rgba(0,0,0,0.4)] whitespace-nowrap">
            COMING SOON
          </div>
          <div className="text-[35px] md:text-[55px]">❓</div>
        </div>

        <div className="p-3.75 text-center">
          <h3 className="mb-2 font-['Press_Start_2P'] text-[14px] text-white md:text-[20px]">
            ???
          </h3>
          <p className="mb-2.5 font-['Press_Start_2P'] text-[10px] leading-relaxed text-slate-400 md:mb-3.75 md:h-10 md:text-[13px]">
            More game modes are being developed!
          </p>
          <button
            className="btn-locked-shadow w-full cursor-not-allowed bg-slate-500 p-3 font-['Press_Start_2P'] text-[12px] text-white md:text-[15px]"
            disabled
          >
            LOCKED
          </button>
        </div>
      </div>
    );
  }

  // Active Game State
  return (
    <div className="arcade-cabinet-transition group relative flex w-70 flex-col border-4 border-black bg-slate-800 shadow-[10px_10px_0px_rgba(0,0,0,0.3)] 2xl:w-95">
      {/* The Marquee (Top) */}
      <div className="flex h-10 items-center justify-center border-b-4 border-black bg-slate-700 px-2 md:h-12.5">
        <span className="hi-score-glow font-['Press_Start_2P'] text-[8px] text-amber-400 md:text-[10px]">
          HI-SCORE: {highScore.toString().padStart(5, "0")}
        </span>
      </div>

      {/* The CRT Screen */}
      <div className="relative m-2 flex h-35 items-center justify-center overflow-hidden border-4 border-slate-500 bg-slate-900 transition-colors duration-100 group-hover:border-yellow-400 group-hover:bg-blue-900 md:m-3.75 md:h-50">
        <div className="screen-flicker"></div>
        <div className="z-2 text-[35px] transition-transform duration-100 steps(2) group-hover:scale-110 md:text-[55px]">
          {icon}
        </div>
      </div>

      {/* The Control Panel (Bottom) */}
      <div className="p-3.75 text-center">
        <h3 className="mb-2 font-['Press_Start_2P'] text-[14px] text-white 2xl:text-[20px]">
          {title}
        </h3>
        <p className="mb-2.5 h-auto font-['Press_Start_2P'] text-[10px] leading-relaxed text-slate-400 md:mb-3.75 md:h-10 md:text-[13px]">
          {description}
        </p>
        {navigate && (
          <Link
            href={navigate}
            className="block btn-pixel-shadow w-full bg-red-500/80 p-3 font-['Press_Start_2P']"
          >
            START
          </Link>
        )}
      </div>
    </div>
  );
};

export default GameModeCard;
