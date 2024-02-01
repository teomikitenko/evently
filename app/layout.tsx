import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Evently",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={poppins.className}>
          <MantineProvider
            theme={{
              fontFamily: poppins.className,
            }}>
            <div className="flex flex-col overflow-x-hidden min-w-[350px]">{children}</div>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
