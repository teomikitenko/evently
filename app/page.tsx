import { getData } from "@/configs/db";
import HeroSection from "@/components/HeroSection";
import EventsCards from "@/components/EventsCards";
export default async function Home() {
  const data = await getData();
  return (
    <div className="pb-10">
      <HeroSection />
      <EventsCards data={data} />
    </div>
  );
}
