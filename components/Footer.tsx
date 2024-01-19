import React from "react";
import Image from "next/image";
import logo from "@/public/assets/images/logo.svg";
import { Text } from "@mantine/core";
const Footer = () => {
  return (
    <footer className="border-t-2 w-full px-10 py-5 flex justify-between">
      <Image src={logo} width={120} height={30} alt="logo" />
      <Text>2023 Evently All Right reserved</Text>
    </footer>
  );
};

export default Footer;
