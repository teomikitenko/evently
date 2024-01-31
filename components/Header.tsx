"use client";
import logo from "../public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button, Text } from "@mantine/core";
import { UserButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import menu from "@/public/assets/icons/menu.svg";
import { Dispatch, SetStateAction, useState } from "react";

const Burger = ({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const pathname = usePathname();
  const links = [
    { name: "Home", link: "/" },
    { name: "Create Event", link: "/create" },
    { name: "My Profile", link: "/profile" },
  ];
  return (
    <div
      className={
        open
          ? "transition-all absolute w-[55%] dotted-bg h-screen top-0 right-0 translate-x-0"
          : "opacity-0 md:hidden transition-all absolute w-[55%] dotted-bg h-screen top-0 right-0 translate-x-[100%]"
      }
    >
      <div className="flex flex-col gap-5">
        <div className="border-b relative">
          <Image
            className="pt-8 pb-4 pl-8"
            src={logo}
            width={128}
            height={38}
            alt="logo"
          />
          <span
            onClick={() => setOpen(false)}
            className={
              open
                ? "block scale-125 absolute top-4 right-4 cursor-pointer"
                : "hidden"
            }
          >
            &times;
          </span>
        </div>
        <ul className="px-8">
          {links.map((l) => (
            <Link key={l.name} href={l.link}>
              <li className="pt-5">
                <Text
                  style={{ fontSize: "16px" }}
                  c={pathname === l.link ? "violet.9" : "inherit"}
                  fw={500}
                >
                  {l.name}
                </Text>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { name: "Home", link: "/" },
    { name: "Create Event", link: "/create" },
    { name: "My Profile", link: "/profile" },
  ];

  return (
    <header className="w-full py-5 px-10 border-b-2 relative ">
      {open && (
        <div className="fixed top-0 left-0 w-[52vw] h-[100vh] backdrop-blur-sm"></div>
      )}
      <div className="flex justify-between">
        <Burger setOpen={setOpen} open={open} />
        <Link href={"/"}>
          <Image src={logo} width={128} height={38} alt="logo" />
        </Link>
        <SignedOut>
          <SignUpButton>
            <Button
              variant="filled"
              color="violet"
              radius="xl"
              type="button"
              px={25}
            >
              <Text size="sm">Login</Text>
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <ul className="gap-12 px-3 align-middle hidden md:flex">
            {links.map((e) => (
              <li key={e.name} className="flex items-center">
                <Link href={e.link}>
                  <Text
                    style={{ fontSize: "16px" }}
                    c={pathname === e.link ? "violet.9" : "inherit"}
                    fw={500}
                  >
                    {e.name}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            {!open && <UserButton afterSignOutUrl="/" />}
            <Image
              className="block md:hidden"
              onClick={() => setOpen(!open)}
              src={menu}
              width={24}
              height={24}
              alt="menu-burger"
            />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
