import React from 'react';

interface Player {
  id: string | number;
  username: string;
  total_score: number;
}

interface LeaderboardProps {
  leaderboard: Player[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div className="relative mx-auto my-20 w-[90%] max-w-4xl border-4 border-slate-500 bg-gray-900 p-5 shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(59,130,246,0.2)] md:p-8">
      
      {/* Header Section */}
      <div className="font-arcade mb-8 flex items-center justify-center gap-5 text-yellow-400">
        <span className="animate-star-pulse text-xl md:text-2xl">★</span>
        <h2 className="text-sm tracking-widest md:text-lg">GLOBAL HALL OF FAME</h2>
        <span className="animate-star-pulse text-xl md:text-2xl">★</span>
      </div>

      {/* Table Container */}
      <div className="font-arcade text-[10px] md:text-xs">
        
        {/* Table Header */}
        <div className="leaderboard-grid border-b-2 border-dashed border-slate-700 px-4 py-4 text-slate-500">
          <span>RANK</span>
          <span>PLAYER</span>
          <span className="text-right">SCORE</span>
        </div>

        {/* Player List */}
        <div className="flex flex-col">
          {leaderboard.map((player, index) => {
            const isChampion = index === 0;
            
            return (
              <div
                key={player.id}
                className={`
                  leaderboard-grid leaderboard-grid px-4 py-5 transition-all duration-100 steps(2) border-b border-slate-800/50 hover:bg-yellow-400/10 hover:text-yellow-400
                  ${isChampion ? "animate-score-flicker bg-yellow-400/5 text-yellow-400" : "text-slate-200"}
                `}
              >
                <span className="opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate pr-2">
                  {player.username}
                </span>
                <span className="text-right font-bold tracking-tighter text-blue-400 group-hover:text-yellow-400">
                  {player.total_score.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle CRT Overlay (Optional, matching your Game Card style) */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-10" 
           style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 255, 0, 0.03))', backgroundSize: '100% 3px, 3px 100%' }}>
      </div>
    </div>
  );
};

export default Leaderboard;