import React from "react";
import CardEvent from "./CardEvent";
import { Tickets } from "@/configs/types/types";
import { FileObject } from "@supabase/storage-js";
import Link from "next/link";

const MyTickets = ({
  data,
  images,
}: {
  data: Tickets[];
  images: FileObject[] | null;
}) => {
  console.log({thisData:data})
  return (
    <section>
      <div className="dotted-bg w-full">
        <div className="flex justify-between py-14 px-10">
          <p className="text-4xl font-bold">My Tickets</p>
          <Link href={"/#events"}>
            <button
              className="bg-violet-600 rounded-full py-3 px-6 hover:bg-violet-500"
              type="button"
            >
              <p className="text-white">Explore More Events</p>
            </button>
          </Link>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid gap-9 grid-cols-3 py-6 px-10">
          {data.map((e) => {
            const image = images!.filter(
              (img) => img.name.split(".")[0] === e.events.title
            );
            return <CardEvent key={e.id} event={e.events} image={image} />;
          })}
        </div>
      ) : (
        <NotFindTickets />
      )}
    </section>
  );
};

export default MyTickets;

const NotFindTickets = () => {
  return (
    <div className="py-6 px-10">
      <div className="dotted-bg flex justify-center py-12">
        <div>
          <h3 className="text-2xl font-bold leading-[3rem]">
            No event tickets purchased yet
          </h3>
          <p className="text-center text-sm">
            No worries - plenty of exciting events to explore!
          </p>
        </div>
      </div>
    </div>
  );
};
