import Hero from "@/components/section/hero";
import Portfolio from "@/components/section/portfolio";
import Background from "@/components/ui/background";
import { Footer } from "@/components/ui/Footer";
import Seperator from "@/components/ui/Seperator";

export default function Home() {
  return (
    <div className="relative z-0  min-h-screen overflow-x-hidden">
      <Background />

      <div className="relative z-10 ">
        <section id="home" className="mb-20 md:mb-10">
          <Hero />
        </section>

        <Seperator className="mb-10 md:-mt-20 " />

        <section id="portfolio">
          <Portfolio />
        </section>

        <Seperator className="mt-15" />

        <Footer />
      </div>
    </div>
  );
}
