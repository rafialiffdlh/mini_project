"use client";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ICategoryItem, IEvent, ITicket } from "@/interfaces/event.interface";
import { ErrorMessage } from "@hookform/error-message";
import { createEventSchema } from "@/schemas/event.schema";
import { api } from "@/config/axios.config";
import { FiUser, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import DatePickerOne from "../dashboard/FormElements/DatePicker/DatePickerOne";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { event_src } from "@/config/image.config";

const MySwal = withReactContent(Swal);
type Props = { params?: { id?: number } };

export default function EventFormComponent({ params }: Props) {
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [venues, setVenues] = useState<ICategoryItem[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [event, setEvent] = useState<IEvent>();
  const ref = useRef<HTMLInputElement>(null);
  const session = useSession();
  const router = useRouter();

  const onTicketChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    const index = tickets.findIndex((x) => x._id === id);
    switch (name) {
      case "name":
        tickets[index].name = value;
        break;
      case "description":
        tickets[index].description = value;
        break;
      case "price":
        tickets[index].price = Number(value);
        break;
      case "maxNumber":
        tickets[index].maxNumber = Number(value);
        break;
      default:
        break;
    }

    setTickets([...tickets]);
  };
  const onTicketDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTickets = [...tickets].filter(
      (x) => x._id !== e.currentTarget.value
    );
    setTickets(newTickets);
  };

  const createTickets = (type: "free" | "paid") => {
    const newTickets = [...tickets];

    // Check if there's already a ticket of the same type
    if (type === "paid" && newTickets.some((ticket) => ticket.price > 0)) {
      Toast.fire({
        icon: "info",
        title: "Hanya satu tiket berbayar yang diperbolehkan.",
      });
      return;
    }

    if (type === "free" && newTickets.some((ticket) => ticket.price === 0)) {
      Toast.fire({
        icon: "info",
        title: "Hanya satu tiket gratis yang diperbolehkan.",
      });
      return;
    }

    const randomId = Math.random().toString(36).slice(2, 10);
    const price = type === "paid" ? 1000 : 0;
    newTickets.push({
      _id: randomId,
      name: "",
      description: "",
      maxNumber: 1,
      price,
      action: "create",
    });
    setTickets(newTickets);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("fetch data category");
      let response = await api.get("/event/category");
      setCategories(response.data.data);
      response = await api.get("/event/venue");
      setVenues(response.data.data);
      if (params) {
        response = await api.get(`/event/${params.id}`);
        console.log(event?.events.event_date);
        setEvent(response.data.data);
        setTickets(response.data.data.ticket_type);
      }
    }
    fetchData();
  }, []);

  const timeRange = () => {
    const time: number[] = [];
    for (let i = 0; i < 24; i++) {
      time.push(i);
    }
    return time;
  };
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: event?.events.title,
      description: event?.events.description,
      event_date: new Date(event?.events.event_date ?? "").toLocaleDateString(
        "en-us",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      ),
      end_date: event?.events.end_date
        ? new Date(event?.events.end_date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : undefined,
      start_time: event?.events.start_time.toString(),
      end_time: event?.events.end_time.toString(),
      category_id: event?.events.category.id?.toString(),
      venue_id: event?.venues.id?.toString(),
      image_src: event?.events.image_src,
      default_discount: event?.events?.default_discount ?? 0,
      default_discount_date: event?.events?.default_discount_date
        ? new Date().toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : undefined,
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    const formCreate = new FormData();
    formCreate.append("image_src", values.image_src);
    formCreate.append("title", values.title);
    formCreate.append("description", values.description);
    formCreate.append("event_date", values.event_date.toString());
    if (values.end_date)
      formCreate.append("end_date", values.end_date.toString());
    formCreate.append("start_time", values.start_time.toString());
    formCreate.append("end_time", values.end_time.toString());
    formCreate.append("category_id", values.category_id.toString());
    formCreate.append("venue", values.venue_id.toString());
    console.log(
      "tickets",
      tickets.map(({ _id, ...rest }) => rest)
    );
    formCreate.append(
      "tickets",
      JSON.stringify(tickets.map(({ _id, ...rest }) => rest))
    );
    if (values.default_discount)
      formCreate.append("default_discount", values.default_discount.toString());
    if (values.default_discount_date)
      formCreate.append(
        "default_discount_date",
        values.default_discount_date.toString()
      );
    Toast.fire({
      icon: "success",
      title: "All Data",
    });
    if (params) {
      formCreate.append("id", String(params.id));
      await api
        .patch(`/organizer/${params.id}`, formCreate, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.data?.user.access_token}`,
          },
        })
        .then((res) => {
          form.reset();
          router.push("/e");
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
        })
        .catch((err) => {
          if (err instanceof Error) {
            Toast.fire({
              icon: "error",
              title: err.message,
            });
          }
        });
    } else {
      await api
        .post("/organizer", formCreate, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.data?.user.access_token}`,
          },
        })
        .then((res) => {
          form.reset();
          router.push("/e");
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
        })
        .catch((err) => {
          if (err instanceof Error) {
            Toast.fire({
              icon: "error",
              title: err.message,
            });
          }
        });
    }
  };

  return (
    <div className="py-4 px-2">
      <div className="mx-auto max-w-screen-xl">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card  dark:bg-gray-700 text-black dark:text-white  w-full md:w-3/4 rounded-lg shadow-md">
            <div className="card-body items-center text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full">
                  <div
                    className={`border-dashed border-2 border-gray-300 p-6 text-center  rounded-lg`}
                  >
                    <img
                      src={
                        form.watch("image_src") instanceof File
                          ? URL.createObjectURL(form.watch("image_src"))
                          : form.watch("image_src")
                          ? event_src + event?.events.image_src
                          : ""
                      }
                      alt="Profile Picture"
                      className="w-full h-full"
                      onClick={() => ref.current?.click()}
                    />
                    <input
                      type="file"
                      {...register("image_src")}
                      onChange={(e) => {
                        if (e.target.files) {
                          const file = e.target.files[0];
                          form.setValue("image_src", file);
                        }
                      }}
                      className="hidden"
                      accept="image/*"
                      ref={ref}
                    />
                    <button
                      className="text-blue-500"
                      type="button"
                      title="gambar"
                      onClick={() => ref.current?.click()}
                    >
                      Unggah gambar/poster/banner
                    </button>
                    <p className="text-gray-500 mt-2 text-sm">
                      Direkomendasikan 724 x 340px dan tidak lebih dari 2MB
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <input
                    type="text"
                    placeholder="Nama Event"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    defaultValue={event ? event.events.title : ""}
                    {...register("title")}
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage errors={errors} name={"title"} />
                  </div>
                  <textarea
                    className="w-full mt-3 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Deskripsi Event"
                    rows={4}
                    defaultValue={event ? event.events.description : ""}
                    {...register("description")}
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage errors={errors} name={"description"} />
                  </div>
                  <select
                    title="Pilih Kategori"
                    defaultValue={event ? event.events.category.id : ""}
                    className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                    {...register("category_id")}
                  >
                    <option value={""} disabled>
                      Pilih Kategori
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage errors={errors} name={"category_id"} />
                  </div>
                  <div className="flex flex-col md:flex-row justify-around bg-grey-200 p-4 rounded-lg shadow-md mt-4">
                    {/* Organizer */}
                    <div className="flex flex-col items-center md:mr-2">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 p-3 rounded-full">
                          <FiUser className="text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Diselenggarakan Oleh
                          </p>
                          <p className="font-medium truncate">
                            {event
                              ? event.events.user.name
                              : session.data?.user.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-2">
                        <DatePickerOne
                          name="Tanggal Event"
                          placeholder="Tanggal Event"
                          register={register("event_date")}
                        />
                      </div>
                      <div className="text-red-500 text-sm mt-1">
                        <ErrorMessage errors={errors} name={"event_date"} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <DatePickerOne
                          name="Akhir Event"
                          placeholder="Tanggal Akhir Event"
                          register={register("end_date")}
                        />
                      </div>
                      <div className="text-red-500 text-sm mt-1">
                        <ErrorMessage errors={errors} name={"end_date"} />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <FiClock className="text-gray-500" />
                        <p className="text-sm text-gray-500">Pilih Waktu</p>
                      </div>
                      <div className="flex  items-center space-x-2">
                        <select
                          title="starttime"
                          defaultValue={""}
                          className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                          {...register("start_time")}
                        >
                          <option value={""}></option>
                          {timeRange().map((time) => {
                            return (
                              <option key={`${time}`} value={`${time}`}>
                                {time < 10 ? `0${time}:00` : `${time}:00`}
                              </option>
                            );
                          })}
                        </select>
                        {" s/d "}
                        <select
                          title="endtime"
                          defaultValue={""}
                          className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                          {...register("end_time")}
                        >
                          {" "}
                          <option value={""}></option>
                          {timeRange().map((time) => {
                            return (
                              <option key={`${time}`} value={`${time}`}>
                                {time < 10 ? `0${time}:00` : `${time}:00`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="text-red-500 text-sm mt-1">
                        <ErrorMessage errors={errors} name={"start_time"} />
                      </div>
                      <div className="text-red-500 text-sm mt-1">
                        <ErrorMessage errors={errors} name={"end_time"} />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-center md:ml-2">
                      <div className="flex items-center space-x-2">
                        <FiMapPin className="text-gray-500" />
                        <p>Venue</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <select
                          title="Pilih Venue"
                          defaultValue={""}
                          className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                          {...register("venue_id")}
                        >
                          <option value={""} disabled>
                            Pilih Venue
                          </option>
                          {venues.map((venue) => (
                            <option key={venue.id} value={venue.id}>
                              {venue.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-red-500 text-sm mt-1">
                        <ErrorMessage errors={errors} name={"venue_id"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card dark:bg-gray-700 text-black dark:text-white mt-2 w-full md:w-3/4 shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="text-lg font-semibold card-title">
                Kategori Tiket
              </h3>
              <div className="flex justify-between space-x-4 mt-4">
                {(tickets.length > 0 && tickets[0].price) ||
                tickets.length == 0 ? (
                  <button
                    className="border border-gray-300 p-3 w-full rounded-md hover:bg-gray-100"
                    type="button"
                    onClick={() => createTickets("paid")}
                  >
                    {tickets.length > 0 ? "Tambah" : "Buat"} Tiket Berbayar
                  </button>
                ) : (
                  ""
                )}
                {!(tickets.length > 0 && tickets[0].price) ||
                tickets.length == 0 ? (
                  <button
                    className="border border-gray-300 p-3 w-full rounded-md hover:bg-gray-100"
                    type="button"
                    onClick={() => createTickets("free")}
                  >
                    Buat Tiket Gratis
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body flex flex-col md:flex-row items-center text-center">
              {tickets.length > 0
                ? tickets.map((ticket) => {
                    return (
                      <div
                        key={ticket._id}
                        className="card bg-base-100 dark:bg-gray-500 w-auto md:w-1/3 shadow-xl"
                      >
                        <div>
                          {" "}
                          <div className="card-actions justify-end">
                            <button
                              title="closeTicket"
                              className="btn btn-square btn-sm"
                              value={ticket._id}
                              onClick={(e) => onTicketDelete(e)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <input
                            value={ticket.name}
                            name="name"
                            type="text"
                            placeholder="Nama Tiket:"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(e) =>
                              onTicketChange(e, String(ticket._id))
                            }
                          />
                          <input
                            value={ticket.description}
                            name="description"
                            type="text"
                            placeholder="Deskripsi Tiket:"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(e) =>
                              onTicketChange(e, String(ticket._id))
                            }
                          />
                          {ticket.price ? (
                            <input
                              value={ticket.price}
                              name="price"
                              type="number"
                              placeholder="Harga:"
                              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                              onChange={(e) =>
                                onTicketChange(e, String(ticket._id))
                              }
                            />
                          ) : (
                            <p className="text-sm text-black dark:text-white">
                              Harga: Gratis
                            </p>
                          )}
                          <input
                            value={ticket.maxNumber}
                            type="number"
                            name="maxNumber"
                            placeholder="Max. Pemesanan:"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(e) =>
                              onTicketChange(e, String(ticket._id))
                            }
                          />
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="card-body items-center text-center ">
              <div className="card-actions">
                <button
                  type="submit"
                  disabled={isSubmitting || tickets.length == 0}
                  className="btn btn-primary"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
