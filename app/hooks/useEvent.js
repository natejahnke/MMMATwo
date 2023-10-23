// useEvent.js
import supabase from "~/utils/supabase";

const cache = new Map();

export function useEvent(eventId) {
  if (cache.has(eventId)) {
    return cache.get(eventId);
  }

  const resource = createEventResource(eventId);
  cache.set(eventId, resource);

  return resource;
}

function createEventResource(eventId) {
  let status = 'pending';
  let result;

  const suspender = fetchEvent(eventId).then(
    res => {
      status = 'success';
      result = res;
    },
    err => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

async function fetchEvent(eventId) {
  const { data: eventDetails, error: eventError } = await supabase
    .from("Calendar")
    .select("*")
    .eq("EventID", eventId);

  if (eventError) {
    throw new Error(`Error fetching event: ${eventError.message}`);
  }

  if (!eventDetails || eventDetails.length === 0) {
    throw new Error(`No event found for EventID: ${eventId}`);
  }

  return eventDetails[0];
}
