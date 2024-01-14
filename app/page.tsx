import { getData } from "@/configs/db";
import HeroSection from "@/components/HeroSection";
import EventsCards from "@/components/EventsCards";
export default async function Home() {
  const data = await getData();
  return (
    <div>
      <HeroSection />
      <EventsCards data={data} />
    </div>
  );
}
