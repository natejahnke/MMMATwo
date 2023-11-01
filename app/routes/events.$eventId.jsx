import { Suspense, useState, useTransition } from "react";
import {
  NavLink,
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

  // Fetch fights data
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
  // console.log(eventId);
  const event = useEvent(eventId);
  const eventDetails = event.read();
  // console.log(event);
  const defaultMainCardCount = eventDetails && eventDetails.PPV ? 6 : 5;
  const mainStartTime = eventDetails.MainStartTime; // Use from hook
  const prelimStartTime = eventDetails.PrelimStartTime; // Use from hook

  const [searchParams] = useSearchParams(); // <-- added this line
  const initialFilter = searchParams.get("filter") || "MAIN CARD";

  // Create a state variable for the current filter
  const [currentFilter, setCurrentFilter] = useState(initialFilter);

  const [isPending, startTransition] = useTransition();

  // Handler to set filter
  const handleSetFilter = (filter) => {
    startTransition(() => {
      setCurrentFilter(filter);
    });
  };
  // const eventResource = useEvent(eventId);
  // Filter matchups based on MAIN CARD count
  const filteredMatchups = fights.filter((matchup, index) =>
    currentFilter === "MAIN CARD"
      ? index < defaultMainCardCount
      : index >= defaultMainCardCount
  );

  function convertToUserTime(timeStr, originalTimeZone = 'America/Chicago') { // Default to CST
    // Create a date object. You can use any date, as we're only interested in time.
    const date = new Date(`1970-01-01T${timeStr}${originalTimeZone === 'America/Chicago' ? '-06:00' : 'Z'}`);
  
    // Format time
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      hour12: true,
      timeZone: originalTimeZone // Ensure that we use the original time zone for formatting
    });
  
    let timeParts = timeFormatter.formatToParts(date);
    let formattedTime = `${timeParts.find(part => part.type === 'hour').value}:${timeParts.find(part => part.type === 'minute').value} ${timeParts.find(part => part.type === 'dayPeriod').value} ${timeParts.find(part => part.type === 'timeZoneName').value}`;
  
    return formattedTime;
  }
  
 
  
  

  return (
    <div className="mx-2 mt-2 flex flex-col">
      <Suspense fallback={<EventBannerSkeleton />}>
        <EventBanner event={event.read()} />
      </Suspense>
      <div className="mb-2 flex justify-between">
        <div>
          <NavLink
            onClick={() => handleSetFilter("MAIN CARD")} // <-- Update state here
            to="?filter=MAIN%20CARD"
            className={`mr-2 ${
              currentFilter === "MAIN CARD" ? "text-secondary" : "text-tertiary"
            }`}
          >
            MAIN CARD
          </NavLink>
          <NavLink
            onClick={() => handleSetFilter("PRELIMS")} // <-- Update state here
            to="?filter=PRELIMS"
            className={
              currentFilter === "PRELIMS" // <-- Check state here
                ? "text-secondary"
                : "text-tertiary"
            }
          >
            PRELIMS
          </NavLink>
        </div>
        <div>
          {/* Your new text element here */}
          <span className="text-secondary">
  {currentFilter === "MAIN CARD"
    ? convertToUserTime(mainStartTime || "21:00:00") // Use database value or fallback
    : currentFilter === "PRELIMS"
    ? convertToUserTime(prelimStartTime || "17:00:00") // Use database value or fallback
    : ""}
</span>

        </div>
      </div>

      <div className="overflow-y-auto mb-2" style={{ height: 'calc(100vh - 300px)' }}> {/* Adjust 100px as needed */}
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
