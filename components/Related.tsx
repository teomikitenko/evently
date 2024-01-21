import type { DB } from "@/configs/types/types";
import { Events } from "./CardFields";

const Related = ({ related }: { related: DB }) => {
  return (
    <section className="px-10">
      <div className="mb-10">
        <p className="font-bold text-4xl">Related Events</p>
      </div>
      <Events events={related.events} images={related.storage!} />
    </section>
  );
};

export default Related;
