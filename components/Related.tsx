import type { DB } from "@/configs/types/types";
import { Events } from "./CardFields";
import { NotFindContent } from "./NotFindContent";

const Related = ({ related }: { related: DB }) => {
  return (
    <section className="px-10">
      <div className="mb-10">
        <p className="text-2xl font-semibold lg:font-bold lg:text-4xl">Related Events</p>
      </div>
      {related!.events!.length > 0 ? (
        <Events events={related.events} images={related.storage!} />
      ) : (
        <NotFindContent title="No Events Found" message="Come back later" />
      )}
    </section>
  );
};

export default Related;
