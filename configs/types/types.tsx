import { FileObject } from "@supabase/storage-js";
import { Tables } from "./supabase";

export type Tickets = Tables<'buyers'> & {events:Tables<'events'>}
export type DB = {
  events: Tables<"events">[];
  storage: FileObject[];
};
export type Event = {
  event: Tables<"events">;
  storage: FileObject[] | null;
};
export type Buyer = {
  name: string | null | undefined;
  event_id: string;
};
