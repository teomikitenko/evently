import Link from "next/link";
import { Tables } from "@/configs/types/supabase";
import { FileObject } from "@supabase/storage-js";
import CardEvent from "./CardEvent";
import { NotFindContent } from "./NotFindContent";
const EventOrganized = ({
  data,
  images,
}: {
  data: Tables<"events">[];
  images: FileObject[] | null;
}) => {
  return (
    <section>
      <div className="dotted-bg w-full">
        <div className="flex justify-between py-14 px-10">
          <div className="flex items-center">
          <p className="text-2xl md:text-4xl hidden sm:block font-bold">Events</p>
          <p className="text-2xl md:text-4xl font-bold flex">Organized</p>
          </div>
          
          <Link href={"/create"}>
            <button
              className="bg-[rgb(98,76,245)]  rounded-full py-3 px-6 hover:hover:bg-[rgb(129,111,245)]"
              type="button"
            >
              <div className="flex">
              <p className="text-white">Create&nbsp;</p>
              <p className="text-white hidden sm:block">New Event</p>
              </div>
            </button>
          </Link>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid lg:gap-5 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-9 sm:grid-cols-2 grid-cols-1  gap-4 py-6 px-10">
          {data.map((e) => {
            const image = images!.filter(
              (img) => img.name.split(".")[0] === e.title
            );
            return <CardEvent key={e.id} event={e} image={image} organized />;
          })}
        </div>
      ) : (
        <NotFindContent
          title="No events have been created yet"
          message="Go create some now"
        />
      )}
    </section>
  );
};

export default EventOrganized;
