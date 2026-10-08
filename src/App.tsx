import Navbar from "@/components/Navbar";
import CursorTrail from "@/components/CursorTrail";
import TypewriterBio from "@/components/TypewriterBio";
import AbujaClock from "@/components/AbujaClock";

export default function App() {
  return (
    <div className="relative h-dvh w-screen overflow-hidden flex flex-col justify-between p-[0.9rem] md:p-6 lg:p-[2.1rem]">
      <CursorTrail />
      <Navbar />

      <main className="relative flex-1 flex flex-col justify-end">
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
          {/* Bio bottom left */}
          <div className="max-w-4xl lg:max-w-5xl text-left">
            <TypewriterBio />
          </div>

          {/* Timestamp bottom right */}
          <div className="self-end md:self-auto font-mono text-xs font-medium tracking-widest uppercase text-primary shrink-0 select-none pb-1">
            <AbujaClock />
          </div>
        </div>
      </main>
    </div>
  );
}
