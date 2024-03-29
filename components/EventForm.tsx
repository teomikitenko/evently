"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  TextInput,
  Textarea,
  useCombobox,
  Combobox,
  Text,
  NumberInput,
  Checkbox,
  NumberInputHandlers,
  Modal,
  Loader,
} from "@mantine/core";
import { create, update } from "@/app/action";
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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import type { Event } from "@/configs/types/types";
import { FileObject } from "@supabase/storage-js";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export type Values = {
  title: string;
  category: string;
  description: string;
  image: FileWithPath[];
  location: string;
  startDate: Date | string;
  endDate: Date | string;
  price: string;
  url: string;
};

const EventForm = ({
  edit = false,
  eventEdit,
}: {
  edit?: boolean;
  eventEdit?: Event;
}) => {
  const [file, setFile] = useState<FileWithPath[] | undefined>();
  const [editableImage, setEditableImage] = useState<FileObject | undefined>();
  const [free, setFree] = useState(false);
  const [categories, setCategories] = useState(["Next Js", "React Js", "Tech"]);
  const [openModal, setOpenModal] = useState(false);
  const [send, setSend] = useState(false);
  const handlersRef = useRef<NumberInputHandlers>(null);
  const combobox = useCombobox();
  const router = useRouter();
  const { user } = useUser();
  const { control, handleSubmit, reset, formState } = useForm<Values>({
    defaultValues: {
      title: edit ? (eventEdit!.event!.title! as string) : "",
      category: edit ? (eventEdit?.event.category as string) : "Category",
      description: edit ? (eventEdit?.event.description as string) : "",
      image: undefined,
      location: edit ? (eventEdit?.event.location as string) : "",
      startDate: edit
        ? new Date(Date.parse(eventEdit?.event.startDate!))
        : new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: edit
        ? new Date(Date.parse(eventEdit?.event.endDate!))
        : new Date(),
      price: edit ? (eventEdit?.event.price as string) : "",
      url: edit ? (eventEdit?.event.url as string) : "",
    },
  });
  useEffect(() => {
    if (edit) {
      setEditableImage(eventEdit!.storage![0]);
    }
  }, [edit]);
  const onSubmit: SubmitHandler<Values> = async (data) => {
    setSend(true);
    const form = new FormData();
    Object.entries(data).map((e) => {
      if (e[0] === "image" && Array.isArray(e[1])) {
        form.append(e[0], e[1][0]);
      } else form.append(e[0], e[1] as string);
    });
    form.append("free", JSON.stringify(free));
    form.append("creater", user?.fullName!);
    if (edit) {
      if(data.image)form.append("img_type",data.image[0].type.split('/')[1])
      const editableData = {
        id: eventEdit?.event.id!,
        form: form,
        prevImage: editableImage,
        prevImageName: eventEdit!.storage![0].name,
      };
      await update(editableData);
      setTimeout(() => {
        router.push(`/event/${editableData.id}`);
      }, 1500);
    } else {
      form.append("img_type",data.image[0].type.split('/')[1])
      let res = await create(form);
      setTimeout(() => router.push(`/event/${res.event![0].id}`), 1500);
    }
  };

  return (
    <>
      <ModalCategory
        setOpened={setOpenModal}
        opened={openModal}
        setCategories={setCategories}
      />
      <form
        className="flex flex-col gap-3 md:gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                classNames={{
                  input: "!font-poppins !text-sm sm:!text-base font-normal",
                }}
                value={value}
                size="lg"
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Event title"
                radius="lg"
                className="w-full md:w-[50%] "
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
                  if (val === "Create category") {
                    setOpenModal(true);
                  } else {
                    onChange(val);
                  }

                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <div
                    onClick={() => combobox.toggleDropdown()}
                    className="w-full md:w-[50%] cursor-pointer"
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
                      classNames={{
                        input:
                          "!font-poppins !text-sm sm:!text-base font-normal",
                      }}
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
                    <Combobox.Option value="Create category">
                      <Text c={"violet.9"} style={{ cursor: "pointer" }}>
                        Create category
                      </Text>
                    </Combobox.Option>
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3 ">
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Textarea
                className="w-full md:w-[50%]"
                classNames={{
                  input: "!font-poppins !text-sm sm:!text-base font-normal",
                }}
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
                className="flex w-full md:w-[50%] rounded-2xl  "
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                onDrop={(file) => {
                  onChange(file);
                  setFile(file);
                  setEditableImage(undefined);
                }}
              >
                {file ? (
                  <Preview file={file} />
                ) : editableImage ? (
                  <Preview prevImage={editableImage} />
                ) : (
                  <ImageContainer />
                )}
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
                classNames={{
                  input: "!font-poppins !text-sm sm:!text-base font-normal",
                }}
                leftSection={
                  <Image src={location} width={24} height={24} alt="location" />
                }
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Location"
                radius="lg"
                className="grow"
                variant="filled"
              />
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DateTimePicker
                className="w-full md:w-[50%]"
                radius="lg"
                variant="filled"
                value={value as Date}
                valueFormat="ddd, MMM D, YYYY h:mm"
                onChange={onChange}
                onBlur={onBlur}
                classNames={{
                  input:
                    "!font-poppins !text-sm sm:!text-base font-normal !py-3.5",
                }}
                leftSectionWidth={90}
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
                      <p>Start:</p>
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
                className="w-full md:w-[50%]"
                radius="lg"
                value={value as Date}
                variant="filled"
                valueFormat="ddd, MMM D, YYYY h:mm"
                onChange={onChange}
                onBlur={onBlur}
                classNames={{
                  input:
                    "!font-poppins !text-sm sm:!text-base font-normal !py-3.5",
                }}
                leftSectionWidth={90}
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
                    <p>End:</p>
                  </div>
                }
              />
            )}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-3">
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <NumberInput
                handlersRef={handlersRef}
                size="lg"
                classNames={{
                  input:
                    "!font-poppins !text-sm sm:!text-base font-normal !py-3.5",
                }}
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
                      classNames={{
                        label:
                          "!font-poppins !text-sm sm:!text-base font-normal ",
                        input:
                          "border-2 border-solid border-[var(--mantine-color-violet-filled)] ",
                      }}
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
                className="w-full md:w-[50%]"
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
                className="w-full md:w-[50%]"
                variant="filled"
              />
            )}
          />
        </div>
        <button
          className={
            send
              ? "w-full bg-[rgb(129,111,245)] rounded-full py-2 relative"
              : "w-full bg-[rgb(98,76,245)] rounded-full py-2 hover:bg-[rgb(129,111,245)]"
          }
          type="submit"
        >
          <div>
            <p className="text-white text-center text-sm sm:text-base ">
              {edit ? "Edit" : "Create Event"}
            </p>
          </div>
          {send && (
            <div className="w-full absolute top-[0.19rem]  flex justify-center">
              <Loader color="blue" type="dots" />
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default EventForm;

const Preview = ({
  file,
  prevImage,
}: {
  file?: FileWithPath[];
  prevImage?: FileObject;
}) => {
  const imageUrl = file && URL.createObjectURL(file[0]);
  return (
    <div className="w-full h-[263px]">
      {prevImage ? (
        <Image
          loader={({ src, width, quality }) => {
            return `https://vthbjyvxqzqwhycurblq.supabase.co/storage/v1/object/public/evently/img/${src}?w=${width}&q=${
              quality || 75
            }`;
          }}
          className=" w-full h-full object-cover rounded-2xl "
          width={0}
          height={0}
          src={`${prevImage.name}`}
          alt="edit-preview"
        />
      ) : (
        <Image
          className=" w-full h-full object-cover rounded-2xl "
          width={0}
          height={0}
          src={imageUrl!}
          onLoad={() => URL.revokeObjectURL(imageUrl!)}
          alt="preview"
        />
      )}
    </div>
  );
};
const ImageContainer = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex w-[50%] mb-2  flex-col gap-3 md:gap-4">
        <div className="flex justify-center">
          <Image src={upload} width={77} height={77} alt="download" />
        </div>
        <p className="text-center text-sm sm:text-base">Drag photo here</p>
        <p className="text-center text-sm sm:text-base">SVG, PNG, JPG</p>
        <button type="button" className="px-4 py-2 rounded-3xl bg-[rgb(98,76,245)]">
          <p className="text-sm text-white">Select image</p>
        </button>
      </div>
    </div>
  );
};

const ModalCategory = ({
  setOpened,
  opened,
  setCategories,
}: {
  setOpened: Dispatch<SetStateAction<boolean>>;
  opened: boolean;
  setCategories: Dispatch<SetStateAction<string[]>>;
}) => {
  const [value, setValue] = useState<string>("");
  const [sended, setSended] = useState(false);

  useEffect(() => {
    if (sended) {
      setCategories((val) => [...val, value]);
      setSended(false);
    }
  }, [sended]);
  return (
    <Modal
      size="55%"
      radius="lg"
      centered
      withCloseButton={false}
      opened={opened}
      onClose={() => setOpened(false)}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 4,
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold text-lg">New Category</p>
        <TextInput
          classNames={{
            input: "!font-poppins !text-sm sm:!text-base font-normal",
          }}
          radius="lg"
          size="md"
          placeholder="Category Name"
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <div className="flex gap-2 mt-3  sm:justify-end">
          <button
            type="button"
            onClick={() => setOpened(false)}
            className=" rounded-lg text-black text-sm w-full sm:w-min sm:px-3  py-2 border"
          >
            <p>Cancel</p>
          </button>
          <button
            className="bg-violet-600 rounded-lg text-sm w-full sm:w-min text-white hover:bg-violet-500 sm:px-3 py-2 border "
            onClick={() => {
              setSended(true);
              setOpened(false);
            }}
          >
            <p>Add</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};
