import { createClient, QueryData } from "@supabase/supabase-js";
import { Database } from "./types/supabase";
import type { Buyer } from "./types/types";
import { Tickets } from "./types/types";
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function getEvent(id: string) {
  const { data: event, error } = await supabase
    .from("events")
    .select()
    .eq("id", id);

  const { data: image } = await supabase.storage.from("evently").list("img", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
    search: event![0].title!,
  });
  return {
    event: event![0],
    storage: image,
  };
}
export async function addEvent(form: FormData) {
  const obj = Object.fromEntries(form.entries());
  const { image, ...rest } = obj;
  rest.free = JSON.parse(rest.free as string);
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
export async function getAllEvents() {
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
export async function buyers(buyer: Buyer) {
  const { data, error } = await supabase
    .from("buyers")
    .insert([buyer])
    .select();
}
export async function getProfileEvents(name: string) {
  const { data, error } = await supabase
    .from("buyers")
    .select()
    .eq("name", name).select(`
    *,
    events (
     *
    )
  `)
  .returns <Tickets[]>()
  const { data: organised } = await supabase
    .from("events")
    .select()
    .eq("creater", name);

    const { data: images } = await supabase.storage.from("evently").list("img", {
      limit: 100,
      offset: 0,
    });

  return {
    my_ticket: data!,
    organised: organised!,
    images:images
  };
}
