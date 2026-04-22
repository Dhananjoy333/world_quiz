import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function Home() {
  return (
    <div className="main-page min-h-screen relative font-gaming overflow-x-hidden">
      <Image
        src="/assets/mainPage/background.avif"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />
      <Navbar/>
      <main className="pb-24">{/* hero section content here */}</main>
    </div>
  );
}