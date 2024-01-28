import { getAllEvents } from "@/configs/db";
import HeroSection from "@/components/HeroSection";
import EventsCards from "@/components/EventsCards";

export const dynamic = 'force-dynamic'


export default async function Home() {
  const data = await getAllEvents();
  return (
    <div className="pb-10">
      <HeroSection />
      <EventsCards data={data} />
    </div>
  );
}
