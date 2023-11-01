import React from "react";

function DetailedMatchupCard({ matchup, fighters }) {
  // Assuming fighters is an array with two objects for Fighter1 and Fighter2
  const [fighter1, fighter2] = fighters;
  const baseUrl =
    "https://bigsnqhiqpvakxfhqcvu.supabase.co/storage/v1/object/public/Fighters/";

  return (
    <div className="w-[359px] h-[200px] relative bg-gradient-to-b from-red-500 to-slate-600 rounded-[10px] flex items-center justify-center">
      <div className="flex items-center">
        {/* Fighter 1 */}
        <div className="mt-8 ml-2 mb-2">
          <img
            className="w-[150px] h-[150px] rounded-lg "
            src={`${baseUrl}${fighter1.InstagramURL}.webp`}
            alt={fighter1.Name}
          />
          <div className="text-slate-100 text-md">{fighter1.Name}</div>
        </div>

        {/* VS Text */}
        <div className="mx-4 text-slate-700 text-[20px]">VS</div>

        {/* Fighter 2 */}
        <div className=" mt-8 mr-2 mb-2">
          <img
            className="w-[150px] h-[150px] rounded-lg "
            src={`${baseUrl}${fighter2.InstagramURL}.webp`}
            alt={fighter2.Name}
          />
          <div className="text-slate-100 text-md">{fighter2.Name}</div>
        </div>
      </div>

      {/* Weight Class */}
      <div className="absolute top-0 mt-1 text-center text-slate-100 text-[10px]">
        {matchup.WeightClass} Bout
      </div>
    </div>
  );
}

export default DetailedMatchupCard;
