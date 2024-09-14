"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { ICategoryItem, ITicket } from "@/interfaces/event.interface";
import { ErrorMessage } from "@hookform/error-message";
import { createEventSchema } from "@/schemas/event.schema";
import { api } from "@/config/axios.config";
import { FiUser, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import DatePickerOne from "../dashboard/FormElements/DatePicker/DatePickerOne";
import { useSession } from "next-auth/react";

const MySwal = withReactContent(Swal);
type Props = {};

export default function EventFormComponent({}: Props) {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [venues, setVenues] = useState<ICategoryItem[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {},
  });

  const onTicketChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    const index = tickets.findIndex((x) => x.id === id);
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
      case "name":
        tickets[index].maxNumber = Number(value);
        break;
      default:
        break;
    }
  };
  const onTicketDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTickets = [...tickets].filter(
      (x) => x.id !== Number(e.currentTarget.value)
    );
    setTickets(newTickets);
  };

  const createTickets = (type: "free" | "paid") => {
    const newTickets = [...tickets];
    const randomId = Math.random().toString(36).slice(2, 10);
    const price = type === "paid" ? 1000 : 0;
    newTickets.push({
      id: Number(randomId),
      name: "",
      description: "",
      maxNumber: 0,
      price,
      action: "create",
    });
    setTickets(newTickets);
  };

  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      console.log("fetch data category");
      let response = await api.get("/event/category");
      console.log(response.data.data);
      setCategories(response.data.data);
      response = await api.get("/event/venue");
      console.log(response.data.data);
      setVenues(response.data.data);
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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    const formCreate = new FormData();
    formCreate.append("title", values.title);
    formCreate.append("description", values.description);
    formCreate.append("event_date", values.event_date.toString());
    formCreate.append("duration", values.duration.toString());
    formCreate.append("category_id", values.category_id.toString());
    formCreate.append("image_src", values.image_src[0]);
    formCreate.append("venue_id", values.venue_id.toString());
    formCreate.append("tickets", JSON.stringify(tickets));
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="card bg-base-100 w-128 md:w-2/3 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="border-dashed border-2 border-gray-300 p-6 text-center">
                  <button className="text-blue-500">
                    Unggah gambar/poster/banner
                  </button>
                  <p className="text-gray-500 mt-2 text-sm">
                    Direkomendasikan 724 x 340px dan tidak lebih dari 2MB
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Nama Event"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                  {...register("title")}
                />

                <textarea
                  className="w-full mt-3 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Deskripsi Event"
                  rows={4}
                  {...register("description")}
                />

                <select
                  title="Pilih Kategori"
                  defaultValue={""}
                  className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                  required
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
                <div className="grid md:flex justify-around bg-white p-4 rounded-lg shadow-md mt-4">
                  {/* Organizer */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-200 p-3 rounded-full">
                        <FiUser className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Diselenggarakan Oleh
                        </p>
                        <p className="font-medium">{session.data?.user.name}</p>
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
                    <div className="flex items-center space-x-2">
                      <DatePickerOne
                        name="Akhir Event"
                        placeholder="Tanggal Akhir Event (opsional)"
                        register={register("end_date")}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <FiClock className="text-gray-500" />
                      <p className="text-sm text-gray-500">Pilih Waktu</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        title="starttime"
                        defaultValue={""}
                        className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                      >
                        {timeRange().map((time) => {
                          return (
                            <option key={`${time}`} value={`${time}`}>
                              {time < 10 ? `0${time}:00` : `${time}:00`}
                            </option>
                          );
                        })}
                      </select>
                      {"s/d"}
                      <select
                        title="endtime"
                        defaultValue={""}
                        className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                      >
                        {" "}
                        {timeRange().map((time) => {
                          return (
                            <option key={`${time}`} value={`${time}`}>
                              {time < 10 ? `0${time}:00` : `${time}:00`}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col items-center">
                    <FiMapPin className="text-gray-500" />
                    <p>Venue</p>
                    <div className="flex items-center space-x-2">
                      <select
                        title="Pilih Venue"
                        defaultValue={""}
                        className="w-full mt-3 border border-gray-300 p-3 rounded-md"
                        required
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-128 md:w-2/3 shadow-xl">
        <div className="card-body items-center text-center">
          <h3 className="text-lg font-semibold card-title">Kategori Tiket</h3>
          <div className="flex justify-between space-x-4 mt-4">
            {(tickets.length > 0 && tickets[0].price) || tickets.length == 0 ? (
              <button
                className="border border-gray-300 p-3 w-full rounded-md hover:bg-gray-100"
                onClick={() => createTickets("paid")}
              >
                Buat Tiket Berbayar
              </button>
            ) : (
              ""
            )}
            {!(tickets.length > 0 && tickets[0].price) ||
            tickets.length == 0 ? (
              <button
                className="border border-gray-300 p-3 w-full rounded-md hover:bg-gray-100"
                onClick={() => createTickets("free")}
              >
                Buat Tiket Gratis
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-body items-center text-center flex">
          {tickets.length > 0
            ? tickets.map((ticket) => {
                return (
                  <div
                    key={ticket.id}
                    className="card bg-base-200 w-auto md:w-1/3 shadow-xl"
                  >
                    <div>
                      {" "}
                      <div className="card-actions justify-end">
                        <button
                          title="closeTicket"
                          className="btn btn-square btn-sm"
                          value={ticket.id}
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
                        onChange={(e) => onTicketChange(e, Number(ticket.id))}
                      />
                      <input
                        value={ticket.description}
                        name="description"
                        type="text"
                        placeholder="Deskripsi Tiket:"
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => onTicketChange(e, Number(ticket.id))}
                      />
                      {ticket.price ? (
                        <input
                          value={ticket.price}
                          name="price"
                          type="number"
                          placeholder="Harga:"
                          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                          onChange={(e) => onTicketChange(e, Number(ticket.id))}
                        />
                      ) : (
                        <p className="text-sm text-gray-500">Harga: Gratis</p>
                      )}
                      <input
                        value={ticket.maxNumber}
                        type="text"
                        name="maxNumber"
                        placeholder="Max. Pemesanan:"
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => onTicketChange(e, Number(ticket.id))}
                      />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </form>
  );
}
