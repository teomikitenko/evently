"use client";
import Image from "next/image";
import { Button, Text, Title } from "@mantine/core";
import calendar from "@/public/assets/icons/calendar.svg";
import location from "@/public/assets/icons/location.svg";

const Event = ({ image }: { image: { publicUrl: string } }) => {
  return (
    <div className="flex gap-8 h-full px-10 ">
     <div className="relative w-[55%]  h-full">
        <Image
          className="object-cover"
          src={image.publicUrl}
          fill
          quality={100}
          alt="img"
        />
      </div>

      <div className="flex flex-col h-full w-[45%] gap-9 pt-5 ">
        <h2 className="font-bold text-4xl">
          WebWonders Summit 2023 - Making web more helpful for everyone
        </h2>
        <div className="flex gap-8">
          <span className="font-bold  text-lg rounded-full flex items-center bg-green-100 px-5 py-2 text-green-700">
            <p>150$</p>
          </span>
          <span className="bg-slate-200 text-base flex items-center px-5 py-2 rounded-full text-slate-00 font-medium">
            <p>Tech</p>
          </span>
          <span className="flex items-center gap-1">
            <p className="text-lg font-medium">by</p>
            <p className="text-indigo-600 text-lg font-medium">
              Software Developer
            </p>
          </span>
        </div>
        <div>
          <Button variant="filled" color="violet" radius="xl" size="md">
            <p className="text-sm">Buy Ticket</p>
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Image src={calendar} width={32} alt="calendar" />
            <p className="flex items-center">
              Thu, Feb 15, 2024 - 8:00 AM Thu, Feb 15, 2024 - 3:00 PM
            </p>
          </div>
          <div className="flex gap-2">
            <Image src={location} width={32} alt="location" />
            <p className="flex items-center">Silicon Valley</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-lg font-bold text-gray-500">What You'll Learn:</p>
          <p>
            Unleash the magic of the web at WebWonders Summit 2023! Join
            renowned web developers, designers, and tech enthusiasts from around
            the globe for three days of immersive talks, hands-on workshops, and
            networking opportunities.
          </p>
          <p className="text-indigo-600 underline mt-5">
            http://webwonderssummit2023.com/
          </p>
        </div>
      </div>  
    </div>
  );
};

export default Event;
