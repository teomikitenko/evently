import React from "react";
import CardEvent from "./CardEvent";
import { Tickets } from "@/configs/types/types";
import { FileObject } from "@supabase/storage-js";
import { NotFindContent } from "./NotFindContent";
import Link from "next/link";

const MyTickets = ({
  data,
  images,
}: {
  data: Tickets[];
  images: FileObject[] | null;
}) => {
  return (
    <section>
      <div className="dotted-bg w-full">
        <div className="flex justify-between py-14 px-10">
          <p className="text-2xl md:text-4xl font-bold flex items-center">My Tickets</p>
          <Link href={"/#events"}>
            <button
              className="bg-[rgb(98,76,245)] rounded-full py-3 px-6 hover:hover:bg-[rgb(129,111,245)]"
              type="button"
            >
              <div className="flex">
                <p className="text-white ">Explore</p>
                <p className="text-white hidden sm:block">&nbsp;More Events</p>
              </div>
            </button>
          </Link>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid lg:gap-5 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-9 sm:grid-cols-2 grid-cols-1 py-6 px-10">
          {data.map((e) => {
            const image = images!.filter(
              (img) => img.name.split(".")[0] === e.events.title
            );
            return <CardEvent key={e.id} event={e.events} image={image} />;
          })}
        </div>
      ) : (
        <NotFindContent
          title="No event tickets purchased yet"
          message="No worries - plenty of exciting events to explore!"
        />
      )}
    </section>
  );
};

export default MyTickets;
