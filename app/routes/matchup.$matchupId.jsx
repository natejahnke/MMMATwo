// routes/matchup.$matchupId.jsx
import DetailedMatchupCard from "~/components/DetailedMatchupCard";
import EventBanner from "~/components/EventBanner";
import { useLoaderData,  } from "@remix-run/react";
import supabase from "~/utils/supabase";
import { useEvent } from "~/hooks/useEvent";
import DetailedMatchupCardBody from "../components/DetailedMatchupCardBody";

export const loader = async ({ params }) => {
  const { matchupId } = params;

  // Fetch the matchup details from the Event table
  const { data: matchupDetails, error: matchupError } = await supabase
    .from("Event")
    .select("Fighter1URL, Fighter2URL, WeightClass, Title, EventID") // Note: Added EventID
    .eq("EventFightID", matchupId);

  if (matchupError) {
    console.error("Error fetching matchup details:", matchupError.message);
  }

  const { Fighter1URL, Fighter2URL } = matchupDetails[0];

  // Fetch the fighters' stats from the Fighters table
  const { data: fighters, error: fightersError } = await supabase
    .from("Fighters")
    .select("*")
    .in("FighterURL", [Fighter1URL, Fighter2URL]);

  if (fightersError) {
    console.error("Error fetching fighters data:", fightersError.message);
  }

  return {
    matchup: matchupDetails[0],
    fighters,
  };
};

export default function MatchupPage() {
  const { matchup, fighters } = useLoaderData();
  
  // Use the custom hook to fetch the event data using EventID from matchup
  const event = useEvent(matchup.EventID);

  // Check if 'fighters' is not empty or null before rendering
  if (fighters && fighters.length > 0) {
    return (
      <div className="mx-2 mt-2">
         {/* Added a check for event being available */}
        {event && <EventBanner event={event.read()} />} 
        <DetailedMatchupCard matchup={matchup} fighters={fighters} />
        <div className="mt-2">
        <DetailedMatchupCardBody matchup={matchup} fighters={fighters} />
        </div>
      </div>
    );
  } else {
    return <div>Error loading fighter details. Please try again.</div>;
  }
}
