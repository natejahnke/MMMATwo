import { Suspense } from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import MatchupContainer from "~/components/MatchupContainer";
import EventBanner from "~/components/EventBanner";
import EventBannerSkeleton from "~/components/EventBannerSkeleton";
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
  console.log(eventId);
  const event = useEvent(eventId);
  console.log(event);
  const defaultMainCardCount = event && event.PPV ? 6 : 5;

  const [searchParams] = useSearchParams(); // <-- added this line
  const currentFilter = searchParams.get("filter") || "MAIN CARD"; // <-- added this line

  // const eventResource = useEvent(eventId);
  // Filter matchups based on MAIN CARD count
  const filteredMatchups = fights.filter((matchup, index) =>
    currentFilter === "MAIN CARD"
      ? index < defaultMainCardCount
      : index >= defaultMainCardCount
  );

  return (
    <div className="mx-2 mt-2">
      <Suspense fallback={<EventBannerSkeleton />}>
        <EventBanner event={event.read()} />
      </Suspense>
      <div className="mb-2 flex justify-between">
  <div>
    <Link
      to="?filter=MAIN%20CARD"
      className={`text-${
        currentFilter === "MAIN CARD" ? "secondary" : "tertiary"
      } mr-2`}
    >
      MAIN CARD
    </Link>
    <Link
      to="?filter=PRELIMS"
      className={`text-${
        currentFilter === "PRELIMS" ? "secondary" : "tertiary"
      }`}
    >
      PRELIMS
    </Link>
  </div>
  <div>
    {/* Your new text element here */}
    <span className="text-secondary">
      {currentFilter === "MAIN CARD" ? "9:00 PM CDT" : currentFilter === "PRELIMS" ? "7:00 PM CDT" : ""}
    </span>
  </div>
</div>


      <div className="overflow-y-auto h-[400px] mb-2">
        {filteredMatchups.map((matchup, index) => (
          <MatchupContainer
            matchup={matchup}
            index={index}
            key={matchup.EventFightID}
          />
        ))}
      </div>
    </div>
  );
}
