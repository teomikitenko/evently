import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import EventsCards from "@/components/EventsCards";
export default function Home() {
  return (
    <div >
    <HeroSection/>
    <EventsCards/>
    </div>
  );
}
