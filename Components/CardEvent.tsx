import { Card, Image, Text, Badge, Button, Group,Stack,darken } from "@mantine/core";
import Link from "next/link";

const CardEvent = () => {
  return (
    <Link href={'/event-page'}>
         <Card className="hover:shadow-lg" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://event-platform-dev.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F875a5b7c-e0d4-4319-9ff3-43a7901ca5d9-c7miis.webp&w=1080&q=75"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group mt="md" mb="xs">
        <span className="bg-green-100 px-4 py-1 w-min  rounded-full">
          <p className="text-sm font-semibold ">25$</p>
        </span>
        <span className="bg-slate-100 px-4 py-1 w-min  rounded-full">
          <p className="text-sm font-semibold text-slate-500 ">Tech</p>
        </span>
      </Group>
<div className="flex flex-col gap-4">
   <Text size="sm" fw={600} c="dimmed">
        Mon, Jan 15, 2:30 PM
      </Text>
      <Text size="lg" fw={500}>Building Information Modeling</Text>
      <Text size="md" fw={500} c={darken('rgb(261,261,261)',.6)} >Software Developer</Text>
      </div>
    </Card>
    </Link>

  );
};

export default CardEvent;
