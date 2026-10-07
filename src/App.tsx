import Navbar from "@/components/Navbar";
import CursorTrail from "@/components/CursorTrail";
import PictureStack from "@/components/stack/PictureStack";
import TypewriterBio from "@/components/TypewriterBio";

export default function App() {
  return (
    <>
      {/* Ambient background accent glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-[140px] opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #001ce3 0%, #00718e 50%, #00ff00 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-40 -right-40 h-[480px] w-[480px] rounded-full blur-[140px] opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #00ff00 0%, #008e71 50%, #0000ff 100%)" }}
      />

      <CursorTrail />
      <Navbar />
      <main className="flex h-dvh overflow-hidden flex-col pt-8 md:flex-row">
        <section className="flex w-full min-h-0 flex-col justify-center px-6 py-8 sm:px-10 md:w-1/2 md:px-12 md:py-0 lg:px-16 overflow-y-auto">
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
