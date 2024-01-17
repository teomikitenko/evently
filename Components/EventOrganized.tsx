import Link from 'next/link'
import { Tables } from "@/configs/types/supabase";
import { FileObject } from "@supabase/storage-js";
import CardEvent from "./CardEvent";
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
          <p className="text-4xl font-bold">Events Organized</p>
          <Link href={'/create'}>
          <button
            className="bg-violet-600 rounded-full py-3 px-6 hover:bg-violet-500"
            type="button"
          >
            <p className="text-white">Create New Event</p>
          </button>
          </Link>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid gap-9 grid-cols-3 py-6 px-10">
          {data.map((e) => {
            const image = images!.filter(
              (img) => img.name.split(".")[0] === e.title
            );
            return <CardEvent key={e.id} event={e} image={image} organized />;
          })}
        </div>
      ) : (
        <NotFindOrganized />
      )}
    </section>
  );
};

export default EventOrganized;

const NotFindOrganized = () => {
  return (
    <div className="py-6 px-10">
      <div className="dotted-bg flex justify-center py-12">
        <div>
          <h3 className="text-2xl font-bold leading-[3rem]">
            No events have been created yet
          </h3>
          <p className="text-center text-sm">Go create some now</p>
        </div>
      </div>
    </div>
  );
};
