import logo from "@/public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button, Text } from "@mantine/core";
import { UserButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";

const Header = () => {
  const links = [
    { name: "Home", link: "/" },
    { name: "Create Event", link: "/create" },
    { name: "My Profile", link: "/profile" },
  ];

  return (
    <header className="w-full py-5 px-10 border-b-2 ">
      <div className="flex justify-between">
        <Image src={logo} width={128} height={38} alt="logo" />
        <SignedOut>
          <SignUpButton>
            <Button variant="filled" color="violet" radius="xl" px={25}>
              <Text size="sm">Login</Text>
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <ul className="flex gap-12 px-3 align-middle">
            {links.map((e) => (
              <li key={e.name} className="flex items-center">
                <Link href={e.link}>
                  <Text style={{ fontSize: "16px" }} fw={500}>
                    {e.name}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
