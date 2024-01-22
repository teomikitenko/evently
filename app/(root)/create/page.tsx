import React from "react";
import EventForm from "@/components/EventForm";

const CreateEvent = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="dotted-bg py-14 px-10">
          <h3 className="text-4xl font-bold">Create Event</h3> 
          </div>
      <div className="px-10 py-9 ">
        <EventForm />
      </div>
    </section>
  );
};

export default CreateEvent;
