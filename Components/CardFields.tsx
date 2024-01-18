import CardEvent from "./CardEvent";
import type { DB } from "@/configs/types/types";
import { useEffect, useState } from "react";
import { FileObject } from "@supabase/storage-js";

//TODO:maybe timeout use
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
    const res = array.filter((e) => {
      const find = e.title?.match(reg);
      if (find) return true;
    });
    setfillteredEvents(res);
  };
  useEffect(() => {
    if (category !== "Category" && category !== "All") {
      const events = data.events.filter((e) => e.category === category);
      filteredArray(events, filteredValue);
    } else filteredArray(data.events, filteredValue);
  }, [category, filteredValue]);
  return fillteredEvents.length > 0 ? (
    <FoundEvents events={fillteredEvents} images={data.storage} />
  ) : (
    <NotFoundEvents />
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
const FoundEvents = ({
  events,
  images,
}: {
  events: DB["events"];
  images: FileObject[];
}) => {
  return (
    <div className="grid gap-9 transition-[opacity]  grid-cols-3">
      {events.map((e,index) => {
        const image = images.filter(
          (img) => img.name.split(".")[0] === e.title
        );
        return <CardEvent key={e.id} event={e} image={image} />;
      })}
    </div>
  );
};
