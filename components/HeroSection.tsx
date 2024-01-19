import React from "react";
import hero from "@/public/assets/images/hero.png";
import Image from "next/image";
import { Text, Button } from "@mantine/core";

const HeroSection = () => {
  return (
    <section>
      <div className="dotted-bg h-full w-full flex px-10  py-9 gap-5">
        <div className="flex flex-col  gap-7 w-1/2">
          <Text
            size="xl"
            component="h1"
            style={{ fontSize: "58px", lineHeight: "74px" }}
            fw={700}
          >
            Host, Connect, Celebrate: Your Events, Our Platform!
          </Text>
          <Text fw={400} style={{ fontSize: "24px", lineHeight: "36px" }}>
            Book and learn helpful tips from 3,168+ mentors in world-class
            companies with our global community.
          </Text>

          <Button
            size="md"
            style={{ width: "max-content" }}
            variant="filled"
            color="violet"
            radius="xl"
            px={27}
          >
            <Text size="sm">Explore now</Text>
          </Button>
        </div>
        <div className="w-1/2 flex justify-center ">
          <Image
            src={hero}
            className="max-h-[80vh] object-contain"
            width={1000}
            height={1000}
            alt="hero"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
