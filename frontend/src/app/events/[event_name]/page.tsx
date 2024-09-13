import EventDetail from "@/components/EventDetail.component";
import React from "react";

type Props = {
  params: {
    event_name: string;
  };
};

export default function page({ params }: Props) {
  return (
    <div>
      <EventDetail event_name={params.event_name} />
    </div>
  );
}
