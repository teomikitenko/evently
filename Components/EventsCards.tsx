"use client";
import { Text, TextInput, Combobox, useCombobox,Card } from "@mantine/core";
import { useState } from "react";
import CardFields from "./CardFields";
import Image from "next/image";
import search from "@/public/assets/icons/search.svg";
import arrowDown from "@/public/assets/icons/caret-down-filled.svg";

const fons = {
  input: {
    fontFamily: "var(--font-poppins)",
    fontSize: "16px",
    fontWeight: "400",
    paddingTop: "25px",
    paddingBottom: "25px",
  },
};

const EventsCards = () => {
  const [value, setValue] = useState("Category");
  const combobox = useCombobox();
  const categories = ["All", "Next Js", "React Js", "Tech"];

  return (
    <section className="flex flex-col px-10 pt-10  gap-12">
      <div>
        <Text fw={700} style={{ fontSize: "40px", lineHeight: "48px" }}>
          Trust by
        </Text>
        <Text fw={700} style={{ fontSize: "40px", lineHeight: "48px" }}>
          Thousands of Events
        </Text>
      </div>
      <div className="flex gap-4">
        <TextInput
          leftSection={
            <Image src={search} width={24} height={24} alt="search" />
          }
          classNames={{ input: "poppins" }}
          styles={fons}
          placeholder="Search title ..."
          radius="lg"
          className="grow "
          variant="filled"
        />
        <Combobox
          withArrow
          dropdownPadding={"10px 20px"}
          transitionProps={{ duration: 160, transition: "fade" }}
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <div
              onClick={() => combobox.toggleDropdown()}
              className="grow cursor-pointer"
            >
              <TextInput
                pointer
                rightSection={
                  <Image src={arrowDown} width={16} height={16} alt="arrow" />
                }
                styles={fons}
                readOnly
                radius="lg"
                variant="filled"
                value={value}
              />
            </div>
          </Combobox.Target>
          <Combobox.Dropdown>
            {categories.map((e) => (
              <Combobox.Options key={e}>
                <Text
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    setValue(e.currentTarget.textContent!);
                    combobox.toggleDropdown();
                  }}
                >
                  {e}
                </Text>
              </Combobox.Options>
            ))}
          </Combobox.Dropdown>
        </Combobox>
      </div>
      <CardFields />
    </section>
  );
};

export default EventsCards;
