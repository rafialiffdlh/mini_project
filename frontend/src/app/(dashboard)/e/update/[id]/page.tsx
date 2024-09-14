import EventFormComponent from "@/components/event/EventForm.component";
import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export default function UpdateEventPage({ params }: Props) {
  return (
    <div>
      <EventFormComponent params={params} />
    </div>
  );
}
