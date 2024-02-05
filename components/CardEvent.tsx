"use client";
import { Card, Text, Group, darken, Modal } from "@mantine/core";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { Tables } from "@/configs/types/supabase";
import { FileObject } from "@supabase/storage-js";
import del from "@/public/assets/icons/delete.svg";
import edit from "@/public/assets/icons/edit.svg";
import arrow from "@/public/assets/icons/arrow.svg";
import { useEffect, useState } from "react";
import { deleteEvents } from "@/app/action";
export const dynamic = "force-dynamic";


const CardEvent = ({
  event,
  image,
  organized = false,
}: {
  event: Tables<"events">;
  image?: FileObject[];
  organized?: boolean;
}) => {
  const [org, setorg] = useState<boolean>(false);

  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  useEffect(() => {
    if (organized) {
      setorg(true);
    }
  }, [organized]);
  return (
    <div className="relative group">
      <Card
        className="hover:shadow-lg"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <Card.Section >
          <Link href={`/event/${event.id}`}>
            <div className="w-full relative aspect-[2/1]">
               <Image
                className="w-full h-full object-cover absolute top-0 left-0"
                src={`${image![0].name}`}
                loader={myLoader}
                width={1000}
                height={1000}
                alt="event-card-image"
              /> 
            </div>
          </Link>
        </Card.Section>
        <Group mt="md" mb="xs">
          <span className="bg-green-100 px-4 py-1 w-min rounded-full">
            <p className="text-sm font-semibold ">
              {event.free ? "Free" : `${event.price}$`}
            </p>
          </span>
          <span className="bg-slate-100 px-4 py-1 w-min rounded-full">
            <p className="text-sm font-semibold text-slate-500 text-nowrap">
              {event.category}
            </p>
          </span>
        </Group>
        <div className="flex flex-col gap-4">
          <Text size="sm" fw={600} c="dimmed">
            {event.startDate?.split(" ").slice(0, 5).join(" ")}
          </Text>
          <Link href={`/event/${event.id}`}>
            <Text size="lg" lineClamp={1} fw={500}>
              {event.title}
            </Text>
          </Link>
          <div className="flex justify-between">
            <Text size="md" fw={500} c={darken("rgb(261,261,261)", 0.6)}>
              {event.creater}
            </Text>
            {org && (
              <Link href={`event/${event.id}/orders`}>
                <div className="flex gap-2">
                  <div className="flex">
                  <p className="text-center sm:block hidden text-[#624CF5]">Order&nbsp;</p>
                  <p className="text-center text-[#624CF5]">Detail</p>
                  </div>
                  <Image src={arrow} width={10} height={10} alt="arrow" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </Card>
      {organized && <EditBadge  eventId={event.id} name={event.title as string} type = {event.img_type as string} />}
    </div>
  );
};

export default CardEvent;

const EditBadge = ({ eventId,name,type }: { eventId: string,name:string,type:string }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="animation-badge opacity-100 lg:opacity-0 lg:group-hover:opacity-100 absolute top-3 right-3 gap-3 sm:gap-0 flex flex-col py-2 px-2 md:gap-3 rounded-lg">
      <Link href={`event/${eventId}/edit`}>
        <button>
          <Image src={edit} width={20} height={20} alt="edit" />
        </button>
      </Link>
      <button
        onClick={() => {
          setOpened(true);
        }}
      >
        <Image src={del} width={20} height={20} alt="del" />
      </button>
      <Modal
        size="60%"
        radius="lg"
        centered
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        overlayProps={{
          backgroundOpacity: 0.2,
          blur: 4,
        }}
      >
        <form
          action={async () => {
            await deleteEvents(eventId,name,type);
            setTimeout(() => setOpened(false), 1000);
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">
              Are you sure you want to delete?
            </p>
            <p className="text-slate-600">
              This will permanently delete this event
            </p>
            <div className="flex gap-2 mt-3 justify-end">
              <button
                type="button"
                onClick={() => setOpened(false)}
                className=" rounded-lg text-black text-sm px-3  py-2 border"
              >
                <p>Cancel</p>
              </button>
              <button
                className="bg-violet-600 rounded-lg text-sm  text-white hover:bg-violet-500 px-3  py-2 border "
                type="submit"
              >
                <p>Delete</p>
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
