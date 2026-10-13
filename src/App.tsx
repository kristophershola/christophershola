import Navbar from "@/components/Navbar";
import CursorTrail from "@/components/CursorTrail";
import TypewriterBio from "@/components/TypewriterBio";
import AbujaClock from "@/components/AbujaClock";
import FollowMeSection from "@/components/FollowMeSection";

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <CursorTrail />

      {/* Floating Navbar pinned at the top */}
      <div className="fixed top-0 left-0 right-0 z-40 p-[0.9rem] md:p-6 lg:p-[2.1rem] pointer-events-none">
        <Navbar className="pointer-events-auto" />
      </div>

      {/* Hero / About Section */}
      <section
        id="about"
        className="relative h-dvh w-full flex flex-col justify-between p-[0.9rem] md:p-6 lg:p-[2.1rem]"
      >
        <div aria-hidden="true" className="h-10" />

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
      </section>

      {/* Follow Me Section */}
      <FollowMeSection />
    </div>
  );
}
