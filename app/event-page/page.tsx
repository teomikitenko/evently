import React from "react";
import Event from "@/components/Event";
import Related from "@/components/Related";
import { getImage, getDataEvent } from "@/configs/db";

const EventPage = async () => {
  const img = await getImage();
  const data = await getDataEvent();
  return (
    <section className="py-9 flex flex-col gap-16">
      <div className=" h-[670px] dotted-bg w-full">
        <Event image={img} />
      </div>
      <Related/>
    </section>
  );
};

export default EventPage;
