import Navbar from "@/components/Navbar";
import CursorTrail from "@/components/CursorTrail";
import PictureStack from "@/components/stack/PictureStack";
import TypewriterBio from "@/components/TypewriterBio";

export default function App() {
  return (
    <>
      <CursorTrail />
      <Navbar />
      <main className="flex h-dvh overflow-hidden flex-col pt-8 md:flex-row">
        <section className="flex w-full min-h-0 flex-col justify-center px-6 py-8 sm:px-10 md:w-1/2 md:px-12 md:py-0 lg:px-16 overflow-y-auto">
          <div className="flex flex-col gap-4 max-w-xl text-left">
            <h1 className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase text-foreground">
              Christopher Shola
            </h1>
            <TypewriterBio />
          </div>
        </section>
        <section className="relative flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden p-4 sm:p-8 md:w-1/2 md:flex-none md:p-12">
          <PictureStack />
        </section>
      </main>
    </>
  );
}
