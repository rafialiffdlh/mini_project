"use client";
import Link from "next/link";
import React from "react";
import { Event } from "@/interfaces/event.interface";
import { api } from "@/config/axios.config";

type Props = {
  event_name: string;
};

const EventDetail = ({ event_name }: Props) => {
  const [event, setEvent] = React.useState<Event | undefined>(undefined);
  React.useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get(`/event/${event_name}`);
      console.log(response);
      const data = (await response.data.data) as Event;
      console.log(data);
      setEvent(data);
    };
    fetchEvents();
  }, undefined);

  return (
    <div className="container">
      <div className="top">
        <div className="breadcrumbs">
          <ul className="flex items-center space-x-2">
            <li className="flex items-center">
              <Link href="/" className="text-blue-500">
                Home
              </Link>
              <span className="mx-1">
                <img
                  src="https://assets.loket.com/web/assets/img/ic-next-ios.svg"
                  alt="next"
                />
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
                <img
                  src="https://assets.loket.com/web/assets/img/ic-next-ios.svg"
                  alt="next"
                />
              </span>
              <label className="text-gray-600">{event?.events.title}</label>
            </li>
          </ul>
        </div>

        <div className="event-detail-banner my-4">
          <img
            src="https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"
            alt="Pertamina Grand Prix of Indonesia 2024"
            onError={(e) =>
              (e.currentTarget.src =
                "https://assets.loket.com/images/banner-event?.jpg")
            }
            className="w-full h-auto"
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
                  Otomotif
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
              <img
                className="h-5 w-5"
                src="https://assets.loket.com/web/assets/img/ic-calender.svg"
                alt="calendar"
              />
              <label className="text-gray-600">27 Sep - 29 Sep 2024</label>
            </div>

            <div className="event-time flex items-center space-x-2">
              <img
                className="h-5 w-5"
                src="https://assets.loket.com/web/assets/img/ic-clock.svg"
                alt="clock"
              />
              <label className="text-gray-600">17:00 - 17:00 WIB</label>
            </div>

            <div className="event-venue flex items-center space-x-2">
              <img
                className="h-5 w-5"
                src="https://assets.loket.com/web/assets/img/ic-location.svg"
                alt="location"
              />
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
                <img
                  className="rounded-full h-8 w-8"
                  src="https://assets.loket.com/neo/production/images/organization/20240403052709.jpg"
                  alt="organizer"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://assets.loket.com/images/default-logo-organization.png")
                  }
                />
              </div>
              <div className="organizer-name">
                <span className="text-gray-600">Diselenggarakan oleh</span>
                <Link
                  href="https://www.loket.com/o/lkt-T2IzUg"
                  className="text-blue-500"
                >
                  {event?.users.name}
                </Link>
              </div>
            </div>
          </div>

          <div className="info-organizer mt-6">
            <div className="flex items-center space-x-2">
              <div className="organizer-avatar">
                <img
                  className="rounded-full h-8 w-8"
                  src="https://assets.loket.com/neo/production/images/organization/20240403052709.jpg"
                  alt="organizer"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://assets.loket.com/images/default-logo-organization.png")
                  }
                />
              </div>
              <div className="organizer-name">
                <span className="text-gray-600">Diselenggarakan oleh</span>
                <Link
                  href="https://www.loket.com/o/lkt-T2IzUg"
                  className="text-blue-500"
                >
                  {event?.users.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
