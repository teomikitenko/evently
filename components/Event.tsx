"use client";
import Image from "next/image";
import calendar from "@/public/assets/icons/calendar.svg";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import location from "@/public/assets/icons/location.svg";
import type { Event } from "@/configs/types/types";
import Checkout from "./Checkout";
const Event = ({ event }: { event: Event }) => {
  const { user } = useUser();
  return (
    <div className="flex w-full gap-6 h-full pl-1 pr-3">
      <div className="w-[62%] h-full ">
        <Image
          className="object-cover object-center	 h-full"
          src={`https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${
            event!.storage![0].name
          } `}
          height={10000}
          width={10000}
          quality={100}
          alt="img"
        />
      </div>

      <div className="flex flex-col h-full w-[45%]  gap-9 pt-5 ">
        <h2 className="font-bold text-4xl">{event.event.title}</h2>
        <div className="flex gap-6">
          <span className="font-bold  text-lg rounded-full flex items-center bg-green-100 px-5 py-2 text-green-700">
            <p>{event.event.free ? "Free" : `${event.event.price}$`}</p>
          </span>
          <span className="bg-slate-200 text-base flex items-center px-5 py-2 rounded-full text-slate-00 font-medium">
            <p>{event.event.category}</p>
          </span>
          <span className="flex items-center gap-2">
            <p className="text-lg font-medium">by</p>
            <p className="text-indigo-600 text-lg font-medium">
              {event.event.creater}
            </p>
          </span>
        </div>
        <div>
          <SignedIn>
            {user?.fullName !== event.event.creater && (
              <Checkout event={event} />
            )}
          </SignedIn>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Image src={calendar} width={32} alt="calendar" />
            <p className="flex items-center font-medium text-lg">
              {`${event.event
                .startDate!.split(" ")
                .slice(0, 5)
                .join(" ")},${event.event
                .endDate!.split(" ")
                .slice(0, 5)
                .join(" ")}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Image src={location} width={32} alt="location" />
            <p className="flex items-center font-medium text-lg">
              {event.event.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-lg font-bold text-gray-500">What You&apos;ll Learn:</p>
          <p>{event.event.description}</p>
          <p className="text-indigo-600 underline mt-5">{event.event.url}</p>
        </div>
      </div>
    </div>
  );
};

export default Event;
