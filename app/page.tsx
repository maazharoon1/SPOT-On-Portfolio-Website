import Hero from "@/components/section/hero";
import Portfolio from "@/components/section/portfolio";
import Background from "@/components/ui/background";
import { Footer } from "@/components/ui/Footer";
import ImagePopup from "@/components/ui/ImagePopup";
import Seperator from "@/components/ui/Seperator";

export default function Home() {
  return (
    <div className=" min-h-screen overflow-x-hidden">
      <Background/>
  <section id="home"> <Hero/>
  </section>
<Seperator className={"mb-10"}/>
  <section id="portfolio"> <Portfolio/>
  </section>
  <Seperator className={"mt-15"} />
  <Footer/>
    </div>
  );
}
