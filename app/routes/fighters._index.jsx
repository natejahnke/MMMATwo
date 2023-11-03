import { useLoaderData } from "@remix-run/react";
// import InstagramIcon from "~/icons/InstagramIcon";
import supabase from "~/utils/supabase";
import { useState, useMemo } from "react";

const weightClassMappings = {
  "FLYWEIGHT": "125 lbs.",
  "BANTAMWEIGHT": "135 lbs.",
  "FEATHERWEIGHT": "145 lbs.",
  "LIGHTWEIGHT": "155 lbs.",
  "WELTERWEIGHT": "170 lbs.",
  "MIDDLEWEIGHT": "185 lbs.",
  "LIGHT HEAVYWEIGHT": "205 lbs.",  // Assuming this is the next class, though no data is provided
  "HEAVYWEIGHT": "265 lbs.",        // Assuming this is the next class, though no data is provided
  "WOMEN'S STRAWEIGHT": "115 lbs.", // Assuming the women's classes have the same weight values
  "WOMEN'S FLYWEIGHT": "125 lbs.",
  "WOMEN'S BANTAMWEIGHT": "135 lbs."
};


export const loader = async ({ request }) => {
  const urlParams = new URLSearchParams(request.url.search);
  const weightClassName = urlParams.get("weightClass");
  const weight = weightClassMappings[weightClassName];

  console.log('weightClassName:', weightClassName);  // Log the weight class name
  console.log('weight:', weight);  // Log the weight

  let query = supabase.from("Fighters").select("Name, Weight, InstagramURL");

  if (weight) {
    query = query.eq("Weight", weight);
  }

  const { data: fighters, error } = await query;

  console.log('fighters:', fighters);  // Log the fetched fighters

  if (error) {
    console.error("Error fetching fighters:", error);
  }

  return {
    fighters,
  };
};

export default function Fighters() {
  const { fighters: allFighters } = useLoaderData();
  const [weightClass, setWeightClass] = useState("");

  const filteredFighters = useMemo(() => {
    const weight = weightClassMappings[weightClass];
    if (weight) {
      return allFighters.filter(fighter => fighter.Weight === weight);
    }
    return allFighters;  // return all fighters if no weight class is selected
  }, [allFighters, weightClass]);

  const handleWeightClassChange = (e) => {
    setWeightClass(e.target.value);
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 text-main">
        <h1 className="text-xl">Fighters</h1>
        <select
          value={weightClass}
          onChange={handleWeightClassChange}
          className="border rounded p-2 w-16 bg-secondary overflow-hidden"
        >
          <option value="">All</option>
          {Object.keys(weightClassMappings).map((weightClassName) => (
            <option key={weightClassName} value={weightClassName}>
              {weightClassName}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {filteredFighters.map((fighter, index) => {
          const nameParts = fighter.Name.split(" ");
          const firstName = nameParts.shift();
          const lastName = nameParts.join(" ");
          const weightNumber = fighter.Weight.replace("lbs.", "");

          return (
            <div
              key={index}
              className="w-[105px] h-[158px] relative overflow-hidden rounded-lg group"
            >
              <img
                src={`https://bigsnqhiqpvakxfhqcvu.supabase.co/storage/v1/object/public/Fighters/${fighter.InstagramURL}.webp`}
                alt={fighter.Name}
                className="object-cover w-full h-full  group-hover:scale-110 transition-all duration-300 ease-in-out"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-50"> */}
              <div className="absolute top-0 right-0 text-sm text-white">
                {weightNumber} <span className="text-xs">lbs</span>
              </div>
              <div className="absolute bottom-0 left-0  text-white uppercase leading-tight">
                <div className="text-sm">{firstName}</div>
                <div className="text-sm -mt-1">{lastName}</div>
                {/* <div className="flex items-center">
                    <InstagramIcon />
                    <div className="text-xs text-tertiary  truncate hover:marquee">
                      {fighter.InstagramURL}
                    </div>
                  </div> */}
              </div>
            </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
}
