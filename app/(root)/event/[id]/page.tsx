import Event from "@/components/Event";
import Related from "@/components/Related";
import { getEvent, getEventsByCategory } from "@/configs/db";

export const dynamic = "force-dynamic";

const EventPage = async ({ params }: { params: { id: string } }) => {
  const event = await getEvent(params.id);
  const relatedEvents = await getEventsByCategory(
    event.event.category!,
    event.event.id
  );
  return (
    <section className="py-9 w-full h-full flex flex-col gap-16 ">
      <div className="dotted-bg w-full h-full">
      <Event event={event}/>
      </div>
      <Related related={relatedEvents}/>
    </section>
  );
};
export default EventPage;
