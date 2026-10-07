import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import PictureStack from "@/components/stack/PictureStack";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex h-dvh overflow-hidden flex-col pt-8 md:flex-row">
        <section className="flex w-full min-h-0 flex-col justify-center gap-6 px-4 py-8 md:w-1/2 md:px-6 md:py-0">
          <h1 className="font-mono font-bold text-5xl md:text-7xl tracking-widest uppercase">
            Christopher Shola
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Portfolio under construction. Sections coming one by one.
          </p>
        </section>
        <section className="relative flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden p-4 sm:p-8 md:w-1/2 md:flex-none md:p-12">
          <PictureStack />
        </section>
      </main>
    </>
  );
}
