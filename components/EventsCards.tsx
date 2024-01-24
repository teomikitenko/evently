"use client";
import { Text, TextInput, Combobox, useCombobox,Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import CardFields from "./CardFields";
import Image from "next/image";
import search from "@/public/assets/icons/search.svg";
import arrowDown from "@/public/assets/icons/caret-down-filled.svg";
import { DB } from "@/configs/types/types";

export const fons = {
  input: {
    fontFamily: "var(--font-poppins)",
    fontSize: "16px",
    fontWeight: "400",
  },
};

const EventsCards = ({ data }: { data: DB }) => {
  const[opened,setOpened] = useState(false)
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState("Category");
  const [categories, setCategories] = useState<string[]>([]);
  const combobox = useCombobox();

  useEffect(() => {
    let arr = data.events!.reduce((sum, current) => {
      sum.push(current.category!);
      return sum;
    }, [] as string[]);
    setCategories(Array.from(new Set(["All", ...arr])));
  }, [data]);

  return (
    <section className="flex flex-col px-10 pt-10  gap-12">
      <div id="events">
        <Text fw={700} style={{ fontSize: "40px", lineHeight: "48px" }}>
          Trust by
        </Text>
        <Text fw={700} style={{ fontSize: "40px", lineHeight: "48px" }}>
          Thousands of Events
        </Text>
      </div>
      <div className="flex  gap-4">
        <TextInput
          leftSection={
            <Image src={search} width={24} height={24} alt="search" />
          }
          classNames={{ input: "poppins" }}
          styles={fons}
          placeholder="Search title ..."
          radius="lg"
          onChange={(event) => setText(event.currentTarget.value)}
          value={text}
          className="grow "
          size="lg"
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
              className="w-[50%] cursor-pointer"
            >
              <TextInput
                pointer
                rightSection={
                  <Image src={arrowDown} width={16} height={16} alt="arrow" />
                }
                styles={fons}
                size="lg"
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
                <Combobox.Option value={e} key={e}>
                  <Text
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setValue(e.currentTarget.textContent!);
                      combobox.toggleDropdown();
                    }}
                  >
                    {e}
                  </Text>
                </Combobox.Option>
              </Combobox.Options>
            ))}
          </Combobox.Dropdown>
        </Combobox>
      </div>
      <CardFields filteredValue={text!} category={value} data={data} />
    </section>
  );
};

export default EventsCards;


