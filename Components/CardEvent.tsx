"use client";
import { Card, Text, Group, darken } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Tables } from "@/configs/types/supabase";
import { FileObject } from "@supabase/storage-js";
import del from '@/public/assets/icons/delete.svg';
import edit from '@/public/assets/icons/edit.svg';

const CardEvent = ({
  event,
  image,
  organized = false,
}: {
  event: Tables<"events">;
  image: FileObject[];
  organized?: boolean;
}) => {
  return (
    <Link href={`/event-page?id=${event.id}`}>
      <Card
        className="hover:shadow-lg"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <Card.Section>
          <div className="h-[222px] relative group">
            <Image
              className="object-cover w-full h-full"
              src={`https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${image[0].name} `}
              width={1000}
              height={360}
              alt="Norway"
            />
            {organized && <EditBadge />}
          </div>
        </Card.Section>
        <Group mt="md" mb="xs">
          <span className="bg-green-100 px-4 py-1 w-min  rounded-full">
            <p className="text-sm font-semibold ">
              {event.free ? "Free" : `${event.price}$`}
            </p>
          </span>
          <span className="bg-slate-100 px-4 py-1 w-min  rounded-full">
            <p className="text-sm font-semibold text-slate-500 text-nowrap">
              {event.category}
            </p>
          </span>
        </Group>
        <div className="flex flex-col gap-4">
          <Text size="sm" fw={600} c="dimmed">
            {event.startDate?.split(" ").slice(0, 5).join(" ")}
          </Text>
          <Text size="lg" lineClamp={2} fw={500}>
            {event.title}
          </Text>
          <Text size="md" fw={500} c={darken("rgb(261,261,261)", 0.6)}>
            {event.creater}
          </Text>
        </div>
      </Card>
    </Link>
  );
};

export default CardEvent;

const EditBadge = () => {
  return (
    <div className="animation-badge group-hover:opacity-100 flex flex-col py-2 px-2 gap-3 rounded-lg">
    <Image src={edit} width={20} height={20} alt="edit"/>
    <Image src={del} width={20} height={20} alt="del"/>
    </div>
  );
};
