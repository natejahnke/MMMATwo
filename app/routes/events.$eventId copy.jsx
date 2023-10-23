import { useState, Suspense } from "react";
import { Link, useLoaderData, useParams, Await } from "@remix-run/react";
import MatchupCard from "~/components/MatchupCard";
import EventBanner from "~/components/EventBanner";
import EventBannerSkeleton from "~/components/EventBannerSkeleton";
import MatchupCardSkeleton from "~/components/MatchupCardSkeleton";
import { useEvent } from "~/hooks/useEvent";
import supabase from "~/utils/supabase";

export const loader = async ({ params }) => {
  const { eventId } = params;
  const { data: fights, error: fightsError } = await supabase
    .from("Event")
    .select("*")
    .eq("EventID", eventId);

  if (fightsError) {
    console.error("Error fetching fights data:", fightsError.message);
  }

  return {
    fights,
  };
};

export default function EventPage() {
  const { fights } = useLoaderData();
  const { eventId } = useParams();
  const event = useEvent(eventId);
  console.log("Event Data:", event);  // Debugging line
  const defaultMainCardCount = event && event.PPV ? 5 : 6;
  const [filter, setFilter] = useState("MAIN CARD");

  // Filter matchups based on MAIN CARD count
  const filteredMatchups = fights.filter((matchup, index) =>
    filter === "MAIN CARD"
      ? index < defaultMainCardCount
      : index >= defaultMainCardCount
  );

  return (
    <div className="mx-2 mt-2">
      <Suspense fallback={<EventBannerSkeleton />}>
        <Await resolve={event}>
          {event ? <EventBanner event={event} /> : null}
        </Await>
      </Suspense>
      <div className="mb-2">
        <button
          className={`text-${
            filter === "MAIN CARD" ? "tertiary" : "secondary"
          } mr-2`}
          onClick={() => setFilter("MAIN CARD")}
        >
          MAIN CARD
        </button>
        <button
          className={`text-${filter === "PRELIMS" ? "tertiary" : "secondary"}`}
          onClick={() => setFilter("PRELIMS")}
        >
          PRELIMS
        </button>
      </div>
      <div>
        <Suspense fallback={<MatchupCardSkeleton />}>
          <Await resolve={fights}>
            {filteredMatchups.map((matchup, index) => (
              <Link
                to={`/matchup/${matchup.EventFightID}`}
                key={matchup.EventFightID}
              >
                <MatchupCard
                  matchup={matchup}
                  bgColor={
                    index % 2 === 0 ? "bg-red-gradient" : "bg-blue-gradient"
                  }
                />
              </Link>
            ))}
          </Await>
        </Suspense>
      </div>
      <Link to="/events">Back to Events List</Link>
    </div>
  );
}
