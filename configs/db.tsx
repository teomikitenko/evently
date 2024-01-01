import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function getImage() {
  const { data} =  supabase.storage
    .from("evently")
    .getPublicUrl("img/image.jpg");
  return data;
}
export async function getDataEvent() {
  let { data: events, error } = await supabase.from("events").select("*");

  return events;
}
