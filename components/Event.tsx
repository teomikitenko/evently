"use client";
import Image from "next/image";
import calendar from "@/public/assets/icons/calendar.svg";
import { SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import location from "@/public/assets/icons/location.svg";
import type { Event } from "@/configs/types/types";
import Checkout from "./Checkout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const Event = ({ event }: { event: Event }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => router.refresh(), 500);
  }, []);
  return (
    <div className="xl:max-w-[1250px]  2xl:max-w-full mx-auto 2xl:mx-0 ">
      <div className="grid grid-rows-[260px,1fr] sm:grid-rows-[430px,1fr] lg:grid-rows-[472px,1fr] 2xl:grid-cols-[1fr,45%] 2xl:grid-rows-[1fr]  w-full h-full lg:px-3 gap-4">
        <div className="lg:flex w-full justify-center 2xl:rounded-none lg:rounded-2xl overflow-hidden relative">
          <Image
            className="w-full hidden lg:block 2xl:hidden blur-[50px] brightness-90 absolute top-0 left-0"
            loader={({ src, width, quality }) => {
              return `https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${src}?w=${width}&q=${
                quality || 75
              }`;
            }}
            src={`${event!.storage![0].name}`}
            height={50}
            width={50}
            quality={25}
            alt="img"
          />
          <Image
            className="absolute top-0 h-full 2xl:w-full w-full lg:w-[940px]  object-center object-cover"
            loader={({ src, width, quality }) => {
              return `https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${src}?w=${width}&q=${
                quality || 75
              }`;
            }}
            src={`${event!.storage![0].name}`}
            height={1000}
            width={1000}
            quality={100}
            alt="img"
          />
        </div>

        <div className="flex justify-center flex-col h-full gap-5 md:gap-7 lg:gap-9 pt-1 sm:pt-5 px-5 ">
          <h2 className="text-2xl font-semibold sm:font-bold sm:text-4xl">
            {event.event.title}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex gap-4 sm:gap-6">
            <span className="sm:font-bold font-semibold text-md sm:text-base rounded-2xl sm:rounded-full flex items-center bg-green-100 px-3 py-2 sm:px-5  text-green-700">
              <p>{event.event.free ? "Free" : `${event.event.price}$`}</p>
            </span>
            <span className="bg-slate-200 text-base flex items-center px-3 sm:px-5 sm:py-2 rounded-2xl sm:rounded-full text-slate-00 font-medium">
              <p>{event.event.category}</p>
            </span>
            </div>
            <span className="flex items-center ml-1 sm:ml-0 gap-2">
              <p className="text-base sm:text-lg font-medium">by</p>
              <p className="text-indigo-600 text-base sm:text-lg font-medium">
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
              <p className="flex items-center font-medium text-base sm:text-lg">
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
              <p className="flex items-center font-medium text-base sm:text-lg">
                {event.event.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col pr-5 sm:pr-0 gap-1 ">
            <p className="text-lg font-semibold sm:font-bold text-gray-500">
              About event:
            </p>
            <p className="text-base ">{event.event.description}</p>
            <p className="text-indigo-600 underline mt-1 sm:p-0  sm:mt-5 ">
              {event.event.url}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
