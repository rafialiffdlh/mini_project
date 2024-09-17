"use client";
import Link from "next/link";
import React from "react";
import { IEvent } from "@/interfaces/event.interface";
import { api } from "@/config/axios.config";
import { avatar_src, event_src } from "@/config/image.config";
import {
  FaCalendar,
  FaChevronRight,
  FaClock,
  FaMapMarker,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type Props = {
  event_name: string;
};

const EventDetail = ({ event_name }: Props) => {
  const session = useSession();
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
  const [event, setEvent] = React.useState<IEvent | null>(null);

  console.log(`/event/${event_name}`);

  React.useEffect(() => {
    const fetchEvents = async () => {
      console.log(`/event/${event_name}`);
      const response = await api.get(`/event/${event_name}`);
      const data = (await response.data.data) as IEvent;
      console.log(response.data.data);
      setEvent(data);
    };
    fetchEvents();
  }, []);

  const onAddCart = async (id: number) => {
    const response = await api.post(`/purchase`, [{ id, quantity: 1 }], {
      headers: {
        Authorization: `Bearer ${session?.data?.user.access_token}`,
      },
    });
    const data = await response.data.data;
    console.log(data);
  };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="top">
        <div className="breadcrumbs">
          <ul className="flex items-center space-x-2">
            <li className="flex items-center">
              <Link href="/" className="text-blue-500">
                Home
              </Link>
              <span className="mx-1">
                <FaChevronRight />
              </span>
            </li>
            <li className="flex items-center">
              <Link href="/event" className="text-blue-500">
                Event
              </Link>
              <span className="mx-1">•</span>
              <Link
                href={`/event?category=${event?.events.category.name}`}
                className="text-blue-500"
              >
                {event?.events.category.name}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">
                <FaChevronRight />
              </span>
              <label className="text-gray-600">{event?.events.title}</label>
            </li>
          </ul>
        </div>

        <div className="event-detail-banner my-4 flex justify-center items-center">
          <img
            src={event ? event_src + (event.events.image_src || "") : ""}
            alt=""
            onError={(e) =>
              (e.currentTarget.src =
                "https://assets.loket.com/images/banner-event?.jpg")
            }
            className="w-64 h-64"
          />
        </div>

        <div className="event-detail-info">
          <div className="event-detail-breadcrumbs mb-2">
            <ul className="flex items-center space-x-2">
              <li className="flex items-center">
                <Link href="/event" className="text-blue-500">
                  Event
                </Link>
                <span className="mx-1">•</span>
                <Link
                  href={`/event?category=${event?.events.category.name}`}
                  className="text-blue-500"
                >
                  {event?.events.category.name}
                </Link>
              </li>
            </ul>
          </div>

          <div className="info-title mb-4">
            <h1 id="gt-event-name" className="text-2xl font-bold">
              {event?.events.title}
            </h1>
          </div>

          <div className="info-additional space-y-4">
            <div className="event-date flex items-center space-x-2">
              <FaCalendar />
              <label className="text-gray-600">
                {event?.events.event_date.toString()}
                {event?.events.end_date
                  ? ` - ${event?.events.end_date.toString()}`
                  : ``}
              </label>
            </div>

            <div className="event-time flex items-center space-x-2">
              <FaClock />
              <label className="text-gray-600">{`${event?.events.start_time} - ${event?.events.end_time}`}</label>
            </div>

            <div className="event-venue flex items-center space-x-2">
              <FaMapMarker />
              <Link
                rel="noopener"
                href="https://www.google.com/maps/search/?api=1&amp;query=0,0"
                target="_blank"
                className="text-blue-500"
              >
                {event?.venues.name},{event?.venues.location.fullName}
              </Link>
            </div>

            <div className="event-organizer-mobile flex items-center space-x-2">
              <div className="organizer-avatar">
                {event?.events.user.image_src ? (
                  <Image
                    className="rounded-full h-8 w-8"
                    src={avatar_src + event.events.user.image_src}
                    alt="organizer"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://assets.loket.com/images/default-logo-organization.png")
                    }
                    width={64}
                    height={64}
                  />
                ) : (
                  <div className="bg-gray-200 p-3 rounded-full">
                    <FaUser />
                  </div>
                )}
              </div>
              <div className="organizer-name">
                <span className="text-gray-600">Diselenggarakan oleh: </span>
                <span className="text-blue-500">{event?.events.user.name}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600">{event?.events.description}</p>
          </div>
          <div className="">
            {event?.ticket_type.map((ticket) => {
              return (
                <div
                  key={ticket.id}
                  className="card bg-base-100 w-96 shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title">{ticket.name}</h2>
                    <p>{ticket.description}</p>
                    <p>{`Harga: ${ticket.price ? ticket.price : "Gratis"}`}</p>
                    <p>
                      {`Sisa: ${
                        ticket.rest ? ticket.rest : ticket.maxNumber
                      } / ${ticket.maxNumber}`}
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        title="Add to cart"
                        type="button"
                        onClick={(e) => onAddCart(Number(ticket.id))}
                        className="btn btn-primary"
                      >
                        Tambah ke keranjang
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
