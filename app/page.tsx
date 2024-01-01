import Image from "next/image";
import HeroSection from "@/Components/HeroSection";
import EventsCards from "@/Components/EventsCards";
export default function Home() {
  return (
    <div >
    <HeroSection/>
    <EventsCards/>
    </div>
  );
}
