import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <>
    {/* DESKTOP NAVBAR - Hidden on mobile */}
      <header className="hidden md:flex relative flex-col items-center">
        <nav className="navbar absolute top-6 left-1/2 -translate-x-1/2 w-[80%] h-20 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-3 text-[14px] text-[#facc15] tracking-[2px]">
            <span className="text-[32px] mb-2">🌍</span>
            WORLDQUIZ
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[#facc15] cursor-pointer hover:text-white transition-colors">LEADERBOARD</span>
            <Show when="signed-out">
              <SignInButton>
                <button className="pixel-button bg-[#ef4444]">LOGIN</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>
      </header>

      {/* MOBILE NAVBAR (Bottom Bar) - Only visible on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#1e293b] border-t-4 border-black px-4 py-3 flex items-center justify-between z-50">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">🌍</span>
          <span className="text-[8px] text-[#facc15]">HOME</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 opacity-70">
          <span className="text-2xl">🏆</span>
          <span className="text-[8px] text-[#facc15]">RANK</span>
        </div>

        <div className="flex items-center">
          <Show when="signed-out">
            <SignInButton>
              <button className="pixel-button-sm bg-[#ef4444]">LOGIN</button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <div className="scale-110">
              <UserButton />
            </div>
          </Show>
        </div>
      </nav>

      {/* Mobile Top Header (Just for Logo) */}
      <div className="md:hidden flex justify-center p-6 w-full">
         <div className="flex items-center gap-2 text-[12px] text-[#facc15] tracking-[1px] bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
            <span>🌍</span> WORLDQUIZ
         </div>
      </div>
    </>
  )
}

export default Navbar