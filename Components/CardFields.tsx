import CardEvent from "./CardEvent";
import type { DB } from "@/configs/types/supabase";

const CardFields = ({ data }: { data: DB }) => {
  return (
    <div className="grid gap-9 grid-rows-2 grid-cols-3">
   {data.events.map(e=>{
    const image = data.storage.filter(img=>img.name.split('.')[0] === e.title)
    return(
      <CardEvent key={e.id} event={e} image={image} />
    )
   })}
    </div>
  );
};

export default CardFields;
