import React from "react";
import Image from "next/image";
import logo from "@/public/assets/images/logo.svg";
const Footer = () => {
  return (
    <footer className="border-t-2 w-full px-10 py-5 flex justify-center sm:justify-between">
      <Image src={logo} width={120} height={30} alt="logo" />
      <p className="text-base hidden sm:block">2024 Evently All Right reserved</p>
    </footer>
  );
};

export default Footer;
