// useEvent.js
import { useState, useEffect } from "react";
import supabase from "~/utils/supabase";

export const useEvent = (eventId) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: eventDetails, error: eventError } = await supabase
        .from("Calendar")
        .select("*")
        .eq("EventID", eventId);
      if (eventError) {
        console.error("Error fetching event:", eventError.message); // Error handling
        return;
      }

      if (eventDetails && eventDetails.length > 0) {
        setEvent(eventDetails[0]);
      } else {
        console.warn(`No event found for EventID: ${eventId}`); // Warning for no data
      }
    };

    fetchData();
  }, [eventId]);

  return event;
};
