import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function getImage() {
  const { data } = supabase.storage
    .from("evently")
    .getPublicUrl("img/image.jpg");
  return data;
}
export async function getEvents() {
  let { data: events, error } = await supabase.from("events").select("*");

  return events;
}
export async function addEvent(form: FormData) {
  const obj = Object.fromEntries(form.entries());
  const { image, ...rest } = obj;
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
