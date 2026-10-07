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
        <section className="flex w-full min-h-0 flex-col justify-center pl-4 pr-6 py-8 sm:pr-10 md:w-1/2 md:pl-6 md:pr-12 md:py-0 lg:pr-16 overflow-y-auto">
          <div className="max-w-xl text-left">
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
