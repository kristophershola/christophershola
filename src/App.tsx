import Navbar from "@/components/Navbar";
import CursorTrail from "@/components/CursorTrail";
import PictureStack from "@/components/stack/PictureStack";
import TypewriterBio from "@/components/TypewriterBio";
import { SelfmintHero } from "@/components/hero/selfmint-hero";
import { PICTURE_STACK_DATA } from "@/components/stack/data";

const HERO_IMAGES = PICTURE_STACK_DATA.map((p) => p.image);

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#fbfbfb] text-neutral-950">
      <CursorTrail />
      <Navbar />

      {/* Hero Section from Gallery Motion */}
      <SelfmintHero images={HERO_IMAGES} />

      {/* Studio Statement & 3D Interactive Picture Deck Section */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center border-t border-neutral-200/80 bg-background px-6 py-20 md:flex-row md:py-24">
        <div className="flex w-full min-h-0 flex-col justify-center px-6 py-8 sm:px-10 md:w-1/2 md:px-12 md:py-0 lg:px-16">
          <div className="max-w-xl text-left">
            <TypewriterBio />
          </div>
        </div>
        <div className="relative flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden p-4 sm:p-8 md:w-1/2 md:flex-none md:p-12">
          <PictureStack />
        </div>
      </section>
    </div>
  );
}

