import { useLoaderData } from "@remix-run/react";
import supabase from "~/utils/supabase";

// Loader function to get all fighters from the "Fighters" table in Supabase
export const loader = async () => {
  const { data: fighters, error } = await supabase
    .from("Fighters")
    .select("Name, Weight, InstagramURL");

  if (error) {
    console.error("Error fetching fighters:", error);
  }

  return {
    fighters,
  };
};

export default function Fighters() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Fighters</h1>

      {/* 3-column grid layout */}
      <div className="grid grid-cols-3 gap-2">
        {data.fighters.map((fighter, index) => (
          <div key={index} className="text-center">
            {/* Outer div with gradient background */}
            <div className="inline-block rounded-full bg-red-gradient p-[2px]">
              {/* Inner div with black border */}
              <div className="rounded-full border-[2px] border-black">
                {/* Actual Image */}
                <img
                  src={`https://bigsnqhiqpvakxfhqcvu.supabase.co/storage/v1/object/public/Fighters/${fighter.InstagramURL}.jpg`}
                  alt={fighter.Name}
                  className="rounded-full h-24 w-24 mx-auto"
                />
              </div>
            </div>
            {/* 3 lines of text */}
            <p className="text-sm">{fighter.Name}</p>

            <p className="text-sm text-gray-500">{fighter.InstagramURL}</p>
            <p className="text-md">{fighter.Weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
