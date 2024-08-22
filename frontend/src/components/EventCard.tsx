import Link from "next/link";

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">
        {event.location} - {event.date}
      </p>
      <Link href={`/events/${event.id}`}>
        <a className="text-blue-500 hover:underline">View Details</a>
      </Link>
    </div>
  );
};

export default EventCard;
