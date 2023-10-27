import { Link, useLoaderData, Await } from "@remix-run/react";
import { defer } from "@remix-run/node";
import { Suspense } from "react";
import EventCard from "~/components/EventCard";
import supabase from "~/utils/supabase";
// import ESPN from "~/icons/ESPN";

// Skeleton component as a fallback
function EventCardSkeleton() {
  return <div>Loading...</div>;
}

export const loader = async () => {
  const eventsPromise = supabase
    .from("Calendar")
    .select("*")
    .order("Date", { ascending: true })
    .then((data) => {
      console.log("Data from supabase:", data); // Debug log here
      return data;
    })
    .catch((error) => {
      console.error("Error loading events:", error);
      return null;
    });

  return defer({
    events: eventsPromise,
  });
};

export default function EventsIndex() {
  const { events } = useLoaderData();

  return (
    <div className="mx-2 mt-2">
      <div
        id="fightsBanner"
        className="mb-2 w-[359px] h-[150px] bg-secondary rounded-lg flex flex-col items-center justify-center relative"
      >
        <h1 className=" text-2xl text-main uppercase leading-tight ">
          FIGHT NIGHTS
        </h1>
      </div>
      <div className="mb-2">
        <Link to="#" className="text-secondary mr-2">
          UPCOMING
        </Link>
        {/* <Link to="#" className="text-tertiary">
          PAST
        </Link> */}
      </div>
      <Suspense fallback={<EventCardSkeleton />}>
        <Await resolve={events}>
          {(resolvedEvents) => {
            // Check if resolvedEvents is an array before calling .map()
            if (Array.isArray(resolvedEvents.data)) {
              console.log("Resolved Events:", resolvedEvents.data); // Log the resolved events for debugging
              return (
                <div className="overflow-y-auto h-[400px] mb-2">
                  {resolvedEvents.data.map((event, index) => (
                    <Link
                      prefetch="intent"
                      to={`/events/${event.EventID}`}
                      key={event.EventID}
                    >
                      <EventCard
                        event={event}
                        bgColor={
                          index % 2 === 0
                            ? "bg-red-gradient"
                            : "bg-blue-gradient"
                        }
                      />
                    </Link>
                  ))}
                </div>
              );
            } else {
              console.error(
                "resolvedEvents.data is not an array:",
                resolvedEvents.data
              );
              return <div>Error: Events could not be loaded.</div>;
            }
          }}
        </Await>
      </Suspense>
    </div>
  );
}
