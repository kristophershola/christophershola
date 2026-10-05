import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-[200vh] pt-40">
        <section className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
          <h1 className="font-mono font-bold text-5xl md:text-7xl tracking-widest uppercase">
            Christopher Shola
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Portfolio under construction. Sections coming one by one.
          </p>
        </section>
      </main>
    </>
  );
}
