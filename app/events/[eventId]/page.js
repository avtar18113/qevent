async function getEvent(eventId) {
  const res = await fetch(
    `https://qevent-backend.labs.crio.do/events/${eventId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }

  return res.json();
}

export default async function EventDetailsPage({ params }) {
  const eventData = await getEvent(params.eventId);

  return (
    <main className="px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <img
          src={eventData.image}
          alt={`${eventData.name} image`}
          className="w-full max-h-[450px] object-cover rounded-md shadow-lg mb-8"
        />

        <h1 className="text-5xl font-bold bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-4">
          {eventData.name}
        </h1>

        <p className="text-xl font-semibold mb-2">{eventData.location}</p>

        <p className="mb-5">
          {new Date(eventData.date).toDateString()} | {eventData.time}
        </p>

        <div className="flex gap-2 flex-wrap mb-6">
          {eventData.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl px-3 py-1 font-bold"
            >
              # {tag}
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3">Artist: {eventData.artist}</h2>

        <p className="leading-8 mb-8">{eventData.description}</p>

        <h3 className="text-3xl font-bold text-orange-500">
          {eventData.price > 0
            ? `$ ${eventData.price.toLocaleString()}`
            : "FREE"}
        </h3>
      </div>
    </main>
  );
}