import { useLoaderData } from "@remix-run/react";
import InstagramIcon from "~/icons/InstagramIcon";
import supabase from "~/utils/supabase";

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
      <div className="grid grid-cols-3 gap-2">
        {data.fighters.map((fighter, index) => {
          const nameParts = fighter.Name.split(" ");
          const firstName = nameParts.shift();
          const lastName = nameParts.join(" ");
          const weightNumber = fighter.Weight.replace("lbs.", "");

          return (
            <div key={index} className="w-[105px] h-[158px] relative overflow-hidden rounded-lg group">
              <img
                src={`https://bigsnqhiqpvakxfhqcvu.supabase.co/storage/v1/object/public/Fighters/${fighter.InstagramURL}.jpg`}
                alt={fighter.Name}
                className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className="absolute top-0 right-0 text-sm text-white">
                  {weightNumber} <span className="text-xs">lbs</span>
                </div>
                <div className="absolute bottom-0 left-0  text-white uppercase leading-tight">
                  <div className="text-sm">{firstName}</div>
                  <div className="text-sm -mt-1">{lastName}</div>
                  <div className="flex items-center">
                    <InstagramIcon />
                    <div className="text-xs text-tertiary  truncate hover:marquee">
                      {fighter.InstagramURL}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
