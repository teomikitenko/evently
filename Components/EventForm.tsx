"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  TextInput,
  Textarea,
  useCombobox,
  Combobox,
  Text,
  Button,
  NumberInput,
  Checkbox,
  NumberInputHandlers,
} from "@mantine/core";
import { create } from "@/app/action";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IconCaretUpFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import upload from "@/public/assets/icons/file-upload.svg";
import location from "@/public/assets/icons/location-grey.svg";
import calendar from "@/public/assets/icons/calendar.svg";
import dollar from "@/public/assets/icons/dollar.svg";
import link from "@/public/assets/icons/link.svg";
import { fons } from "./EventsCards";
import { DateTimePicker } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";

const checkbox = {
  input: {
    border: "2px solid var(--mantine-color-violet-filled)",
  },
  label: {
    fontFamily: "var(--font-poppins)",
    fontSize: "16px",
    fontWeight: "400",
  },
};

export const fons2 = {
  input: {
    fontFamily: "var(--font-poppins)",
    fontSize: "16px",
    fontWeight: "400",
  },
};
const picker = {
  input: {
    fontFamily: "var(--font-poppins)",
    fontSize: "16px",
    fontWeight: "400",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
};
const numb = {
  input: {
    fontFamily: "var(--font-poppins)",
    fontSize: "16px",
    fontWeight: "400",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
};
const drop = {
  inner: {
    width: "100%",
  },
};

export type Values = {
  title: string;
  category: string;
  description: string;
  image: FileWithPath[];
  location: string;
  startDate: Date;
  endDate: Date;
  price: string;
  url: string;
};

const EventForm = () => {
  const [file, setFile] = useState<FileWithPath[] | undefined>();
  const [free, setFree] = useState(false);
  const handlersRef = useRef<NumberInputHandlers>(null);
  const combobox = useCombobox();
  const categories = ["All", "Next Js", "React Js", "Tech"];
  const {user} = useUser();

  const { control, handleSubmit, reset, formState } = useForm<Values>({
    defaultValues: {
      title: "",
      category: "Category",
      description: "",
      image: undefined,
      location: "",
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
      price: "",
      url: "",
    },
  });
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setFile(undefined);
    }
  }, [formState.isSubmitSuccessful]);
  const onSubmit: SubmitHandler<Values> = async (data) => {
    const form = new FormData();
    Object.entries(data).map((e) => {
      if (e[0] === "image" && Array.isArray(e[1])) {
        form.append(e[0], e[1][0]);
      } else form.append(e[0], e[1] as string);
    });
    form.append("free", JSON.stringify(free));
    form.append('creater',user?.fullName!)
    reset();
    await create(form);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              classNames={{ input: "poppins" }}
              value={value}
              size="lg"
              styles={fons}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Event title"
              radius="lg"
              className="w-[50%]  "
              variant="filled"
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Combobox
              withArrow
              dropdownPadding={"10px 20px"}
              transitionProps={{ duration: 160, transition: "fade" }}
              store={combobox}
              onOptionSubmit={(val) => {
                onChange(val);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <div
                  onClick={() => combobox.toggleDropdown()}
                  className="w-[50%] cursor-pointer"
                >
                  <TextInput
                    onBlur={onBlur}
                    pointer
                    rightSection={
                      <IconCaretDownFilled
                        width={10}
                        height={10}
                        className="dimmed"
                      />
                    }
                    size="lg"
                    styles={fons}
                    readOnly
                    radius="lg"
                    variant="filled"
                    value={value}
                  />
                </div>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>
                  {categories.map((e) => (
                    <Combobox.Option value={e} key={e}>
                      <Text style={{ cursor: "pointer" }}>{e}</Text>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          )}
        />
      </div>
      <div className="flex  gap-3 ">
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Textarea
              className="w-[50%]"
              styles={fons2}
              radius="lg"
              variant="filled"
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Description"
              minRows={10}
              value={value}
              autosize
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Dropzone
              bg={"rgb(241 245 249)"}
              styles={{
                inner: {
                  width: "100%",
                },
              }}
              className="flex w-[50%] rounded-2xl  "
              accept={IMAGE_MIME_TYPE}
              maxFiles={1}
              onDrop={(file) => {
                onChange(file);
                setFile(file);
              }}
            >
              {file ? <Preview file={file} /> : <ImageContainer />}
            </Dropzone>
          )}
        />
      </div>
      <div className="grow">
        <Controller
          name="location"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              size="50"
              classNames={{ input: "poppins" }}
              styles={fons}
              leftSection={
                <Image src={location} width={24} height={24} alt="location" />
              }
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Event title"
              radius="lg"
              className="grow "
              variant="filled"
            />
          )}
        />
      </div>
      <div className="flex gap-3">
        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DateTimePicker
              className="w-[50%]"
              radius="lg"
              variant="filled"
              value={value}
              valueFormat="ddd, MMM D, YYYY h:mm A"
              defaultValue={
                new Date(new Date().setDate(new Date().getDate() - 7))
              }
              onChange={onChange}
              onBlur={onBlur}
              styles={picker}
              leftSectionWidth={130}
              leftSection={
                <div className="flex gap-1">
                  <div className="flex items-start">
                    <Image
                      className="grayscale"
                      src={calendar}
                      width={24}
                      height={24}
                      alt="location"
                    />
                  </div>
                  <div>
                    <p>Start Date:</p>
                  </div>
                </div>
              }
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DateTimePicker
              className="w-[50%]"
              clearable
              radius="lg"
              value={value}
              variant="filled"
              valueFormat="ddd, MMM D, YYYY h:mm A"
              defaultValue={new Date()}
              onChange={onChange}
              onBlur={onBlur}
              styles={picker}
              leftSectionWidth={130}
              leftSection={
                <div className="flex gap-2">
                  <div className="flex items-start">
                    <Image
                      className="grayscale"
                      src={calendar}
                      width={24}
                      height={24}
                      alt="location"
                    />
                  </div>
                  <p>End Date:</p>
                </div>
              }
            />
          )}
        />
      </div>
      <div className="flex gap-3">
        <Controller
          name="price"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <NumberInput
              handlersRef={handlersRef}
              size="lg"
              styles={numb}
              readOnly={free}
              leftSection={
                <Image src={dollar} width={24} height={24} alt="dollar" />
              }
              rightSectionWidth={200}
              rightSection={
                <div className="flex gap-2">
                  {
                    <div className="flex flex-col items-baseline">
                      <button
                        type="button"
                        disabled={free}
                        onClick={() => handlersRef.current?.increment()}
                        className="w-[15px] h-[12px] flex justify-center items-center hover:bg-gray-300"
                      >
                        <IconCaretUpFilled className="dimmed" />
                      </button>
                      <button
                        type="button"
                        disabled={free}
                        onClick={() => handlersRef.current?.decrement()}
                        className="w-[15px] h-[12px] flex justify-center items-center   hover:bg-gray-300 "
                      >
                        <IconCaretDownFilled className="dimmed" />
                      </button>
                    </div>
                  }
                  <Checkbox
                    labelPosition="left"
                    label="Free ticket"
                    styles={checkbox}
                    color="violet"
                    checked={free}
                    onChange={(event) => setFree(event.currentTarget.checked)}
                  />
                </div>
              }
              onChange={onChange}
              onBlur={onBlur}
              value={free ? "" : value}
              placeholder="Price"
              radius="lg"
              className="w-[50%]"
              variant="filled"
            />
          )}
        />
        <Controller
          name="url"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              size="50"
              classNames={{ input: "poppins" }}
              styles={fons}
              leftSection={
                <Image src={link} width={24} height={24} alt="link" />
              }
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="URL"
              radius="lg"
              className="w-[50%]"
              variant="filled"
            />
          )}
        />
      </div>
      <button
        className="w-full bg-violet-500 rounded-full py-2 hover:bg-violet-600"
        type="submit"
      >
        <p className="text-white">Create Event</p>
      </button>
    </form>
  );
};

export default EventForm;
const Preview = ({ file }: { file: FileWithPath[] }) => {
  const imageUrl = URL.createObjectURL(file[0]);
  return (
    <div className="w-full h-[263px]">
      <Image
        className=" w-full h-full object-cover rounded-2xl "
        width={0}
        height={0}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        alt="preview"
      />
    </div>
  );
};
const ImageContainer = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex w-[50%]  flex-col gap-4">
        <div className="flex justify-center">
          <Image src={upload} width={77} height={77} alt="download" />
        </div>
        <p className="text-center">Drag photo here</p>
        <p className="text-center">SVG, PNG, JPG</p>
        <Button variant="filled" color="violet" radius="xl">
          <Text size="sm">Select from computer</Text>
        </Button>
      </div>
    </div>
  );
};
