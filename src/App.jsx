import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ObjectionBar from "./components/ObjectionBar.jsx";
import StoriesTour from "./components/StoriesTour.jsx";
import StayBuilder from "./components/StayBuilder.jsx";
import StickyBooking from "./components/StickyBooking.jsx";
import { DirectBooking, FAQ, FinalCTA, Footer, Garden, Location, Pub, Rooms, SocialProof } from "./components/Sections.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ObjectionBar />
        <Rooms />
        <StoriesTour />
        <StayBuilder />
        <Garden />
        <Pub />
        <SocialProof />
        <DirectBooking />
        <Location />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyBooking />
    </>
  );
}
