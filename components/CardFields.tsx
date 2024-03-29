"use client";
import CardEvent from "./CardEvent";
import type { DB } from "@/configs/types/types";
import { useEffect, useState } from "react";
import { FileObject } from "@supabase/storage-js";

const CardFields = ({
  data,
  category,
  filteredValue,
}: {
  data: DB;
  category: string;
  filteredValue: string;
}) => {
  const [fillteredEvents, setfillteredEvents] = useState(data.events);

  const filteredArray = (array: DB["events"], text: string) => {
    const reg = new RegExp(text as string, "i");
    const res = array!.filter((e) => {
      const find = e.title?.match(reg);
      if (find) return true;
    });
    setfillteredEvents(res);
  };
  useEffect(() => {
    if (category !== "Category" && category !== "All") {
      const events = data.events!.filter((e) => e.category === category);
      filteredArray(events, filteredValue);
    } else filteredArray(data.events, filteredValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, filteredValue]);
  return (
    <>
      {fillteredEvents!.length > 0 ? (
        <Events events={fillteredEvents} images={data.storage!} />
      ) : (
        <NotFoundEvents />
      )}
    </>
  );
};

export default CardFields;

const NotFoundEvents = () => {
  return (
    <div className="py-6 px-10">
      <div className="dotted-bg flex justify-center py-12">
        <div>
          <h3 className="text-2xl font-bold leading-[3rem]">No Events Found</h3>
          <p className="text-center text-sm">Come back later</p>
        </div>
      </div>
    </div>
  );
};
export const Events = ({
  events,
  images,
}: {
  events: DB["events"];
  images: FileObject[];
}) => {
  return (
    <div className="grid lg:gap-5 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-9 sm:grid-cols-2 grid-cols-1  gap-4 gap-y-5">
      {events!.map((e) => {
        const image = images.filter(
          (img) => img.name.split(".")[0] === e.title
        );
        return <CardEvent key={e.id} event={e} image={image} />;
      })}
    </div>
  );
};
