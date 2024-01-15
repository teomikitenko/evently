import { Card, Text, Badge, Button, Group, Stack, darken } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Tables } from "@/configs/types/supabase";
import { FileObject } from "@supabase/storage-js";

const CardEvent = ({
  event,
  image,
}: {
  event: Tables<"events">;
  image: FileObject[];
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
          <div className="h-[222px]">
            <Image
              className="object-cover h-full"
              src={`https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${image[0].name} `}
              width={1000}
              height={360}
              alt="Norway"
            />
          </div>
        </Card.Section>
        <Group mt="md" mb="xs">
          <span className="bg-green-100 px-4 py-1 w-min  rounded-full">
            <p className="text-sm font-semibold ">{event.free?'Free':`${event.price}$`}</p>
          </span>
          <span className="bg-slate-100 px-4 py-1 w-min  rounded-full">
            <p className="text-sm font-semibold text-slate-500 ">{event.category}</p>
          </span>
        </Group>
        <div className="flex flex-col gap-4">
          <Text size="sm" fw={600} c="dimmed">
            {event.startDate?.split(' ').slice(0,5).join(' ')}
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
