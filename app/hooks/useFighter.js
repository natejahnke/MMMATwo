import supabase from "~/utils/supabase";

const fighterCache = new Map();

export function useFighter(fighterURL) {
  if (fighterCache.has(fighterURL)) {
    return fighterCache.get(fighterURL);
  }

  const resource = createFighterResource(fighterURL);
  fighterCache.set(fighterURL, resource);

  return resource;
}

export function invalidateFighterCache(fighterURL) {
  fighterCache.delete(fighterURL);
}

export async function fetchAndCacheMultipleFighters(fighterURLs) {
  for (const url of fighterURLs) {
    if (!fighterCache.has(url)) {
      try {
        const data = await fetchFighter(url);
        const resource = {
          read: () => data,
        };
        fighterCache.set(url, resource);
      } catch (error) {
        console.error(`Failed to fetch fighter for URL ${url}: ${error.message}`);
      }
    }
  }
}

function createFighterResource(fighterURL) {
  let status = 'pending';
  let result;

  const suspender = fetchFighter(fighterURL).then(
    res => {
      status = 'success';
      result = res;
    },
    err => {
      status = 'error';
      result = err;
      // Remove from cache if an error occurs
      fighterCache.delete(fighterURL);
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

async function fetchFighter(fighterURL) {
  const { data: fighterDetails, error: fighterError } = await supabase
    .from("Fighters")
    .select("InstagramURL")
    .eq("FighterURL", fighterURL);

  if (fighterError) {
    throw new Error(`Error fetching fighter: ${fighterError.message}`);
  }

  if (!fighterDetails || fighterDetails.length === 0) {
    throw new Error(`No fighter found for ID: ${fighterURL}`);
  }

  return fighterDetails[0];
}
