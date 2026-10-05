import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import MasonryGrid from "@/components/grid/MasonryGrid";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex min-h-screen flex-col pt-8 md:flex-row">
        <section className="flex w-full flex-col justify-center gap-6 px-4 py-16 md:w-1/2 md:px-6 md:py-0">
          <h1 className="font-mono font-bold text-5xl md:text-7xl tracking-widest uppercase">
            Christopher Shola
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Portfolio under construction. Sections coming one by one.
          </p>
        </section>
        <section className="relative flex w-full h-[70vh] items-center justify-center overflow-hidden p-6 md:w-1/2 md:h-auto md:p-12">
          <MasonryGrid />
        </section>
      </main>
    </>
  );
}
