import React from "react";
import hero from "../public/assets/images/hero.png";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section>
      <div className="dotted-bg h-full w-full flex flex-col md:flex-row  px-10  py-9 gap-5">
        <div className="flex flex-col  gap-7 md:w-1/2">
          <h1 className="text-4xl leading-snug lg:text-5xl lg:leading-snug xl:leading-snug xl:text-6xl font-bold">
            Host, Connect, Celebrate: Your Events, Our Platform!
          </h1>
          <h2 className="text-xl lg:text-2xl">
            Book and learn helpful tips from 3,168+ mentors in world-class
            companies with our global community.
          </h2>
          <button className="sm:w-fit px-6 py-3 rounded-3xl bg-[rgb(98,76,245)]">
          <a href="#events">
              <p className="text-white">Explore now</p>
            </a>
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center ">
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

