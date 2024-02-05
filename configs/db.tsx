import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";
import type { Buyer } from "./types/types";
import { Tickets } from "./types/types";
import { FileObject } from "@supabase/storage-js";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const updateEvent = async (
  id: string,
  form: FormData,
  prevImage?: FileObject,
  prevImageName?: string
) => {
  const obj = Object.fromEntries(form.entries());
  const { image, ...rest } = obj;
  rest.free = JSON.parse(rest.free as string);
  if (prevImage) {
    try {
      Promise.all([
        supabase.storage
          .from("evently")
          .move(
            `img/${prevImage.name}`,
            `img/${rest.title}.${prevImage.name.split(".")[1]}`
          ),
        supabase.from("events").update(rest).eq("id", id),
      ]).then((res) => console.log("success update"));
    } catch (error) {
      throw error;
    }
  } else {
    const img = form.get("image") as File;
    const type = img!.type!.split("/")[1];

    try {
      if (prevImageName !== `${rest.title}.${type}`) {
        await supabase.storage.from("evently").remove([`img/${prevImageName}`]);
      }
      console.log({
        message: "im in else",
        imageToDelete: prevImageName,
        imageToUpload: `img/${rest.title}.${type}`,
      });

      await Promise.all([
        supabase.from("events").update(rest).eq("id", id),
        supabase.storage
          .from("evently")
          .upload(`img/${rest.title}.${type}`, img, {
            cacheControl: "0",
            upsert: true,
          })
          .then((res) => console.log(res)),
      ]);
    } catch (error) {
      throw error;
    }
  }
};

export const getEventsByCategory = async (category: string, exepId: string) => {
  try {
    const { data: events, error } = await supabase
      .from("events")
      .select()
      .not("id", "in", `(${exepId})`)
      .eq("category", category);
    const { data: images } = await supabase.storage
      .from("evently")
      .list("img", {
        limit: 100,
        offset: 0,
      });
    return {
      events: events,
      storage: images,
    };
  } catch (error) {
    throw error;
  }
};
export async function getEvent(id: string) {
  try {
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
  } catch (error) {
    throw error;
  }
}
export async function addEvent(form: FormData) {
  const obj = Object.fromEntries(form.entries());
  const { image, ...rest } = obj;
  rest.free = JSON.parse(rest.free as string);
  const img = form.get("image") as File;
  const type = img.type.split("/")[1];
  try {
    const { data } = await supabase.from("events").insert([rest]).select();
    const { data: image } = await supabase.storage
      .from("evently")
      .upload(`img/${rest.title}.${type}`, img, {
        cacheControl: "3600",
        upsert: false,
      });
    return { event: data, img: image };
  } catch (error) {
    throw error;
  }
}
export async function getAllEvents() {
  try {
    let { data: events } = await supabase.from("events").select("*");
    const { data: images } = await supabase.storage
      .from("evently")
      .list("img", {
        limit: 100,
        offset: 0,
      });

    return {
      events: events!,
      storage: images!,
    };
  } catch (error) {
    throw error;
  }
}
export async function buyers(buyer: Buyer) {
  try {
    const { data, error } = await supabase
      .from("buyers")
      .insert([buyer])
      .select();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getProfileEvents(name: string) {
  try {
    const { data, error } = await supabase
      .from("buyers")
      .select()
      .eq("name", name)
      .select(
        `
    *,
    events (
     *
    )
  `
      )
      .returns<Tickets[]>();
    const { data: organised } = await supabase
      .from("events")
      .select()
      .eq("creater", name);

    const { data: images } = await supabase.storage
      .from("evently")
      .list("img", {
        limit: 100,
        offset: 0,
      });

    return {
      my_ticket: data!,
      organised: organised!,
      images: images,
    };
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetails(id: string) {
  const { data, error } = await supabase
    .from("buyers")
    .select()
    .eq("event_id", id)
    .select(
      `*,
    events (
      price,free,title)`
    );
  return data;
}

export async function deleteEvent(id: string, name: string, type: string) {
  console.log(`img/${name}.${type}`);
  try {
    await supabase.from("events").delete().eq("id", id);
    await supabase.storage.from("evently").remove([`img/${name}.${type}`]);
  } catch (error) {
    throw error;
  }
}
