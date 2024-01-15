import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function getEvent(id:string) {
  const { data:event, error } = await supabase
  .from('events')
  .select()
  .eq('id', id)

  const { data:image } = await supabase
  .storage
  .from('evently')
  .list('img', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
    search: event![0].title!
  })
  return {
    event:event![0],
    storage:image
  }
}
export async function addEvent(form: FormData) {
  const obj = Object.fromEntries(form.entries());
  const { image, ...rest } = obj;
  rest.free = JSON.parse(rest.free as string)
   const img = form.get("image") as File;
  const type = img.type.split("/")[1];

  await supabase.from("events").insert([rest]).select();
  await supabase.storage
    .from("evently")
    .upload(`img/${rest.title}.${type}`, img, {
      cacheControl: "3600",
      upsert: false,
    });
}
export async function getData() {
  let { data: events } = await supabase.from("events").select("*");
  const { data: images } = await supabase.storage.from("evently").list("img", {
    limit: 100,
    offset: 0,
  });

  return {
    events: events!,
    storage: images!,
  }; 
}
