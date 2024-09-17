import EventDetail from "@/components/EventDetail.component";
import React from "react";

type Props = { params: { id: string } };

export default function page({ params }: Props) {
  return (
    <div>
      <EventDetail event_name={params.id} />
    </div>
  );
}
