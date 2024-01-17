import React from "react";
import Event from "@/components/Event";
import Related from "@/components/Related";
import { getEvent } from "@/configs/db";

const EventPage = async ({searchParams}:{searchParams:{id:string}}) => {
  const event = await getEvent(searchParams.id)
  return (
    <section className="py-9 w-full h-full flex flex-col gap-16 ">
       <div className="dotted-bg w-full h-full">
        <Event event={event} />
      </div>
      <Related/> 
    </section>
  );
};

export default EventPage;
