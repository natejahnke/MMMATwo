import React from "react";

function DetailedMatchupCard({ matchup, fighters }) {
  // Assuming fighters is an array with two objects for Fighter1 and Fighter2
  const [fighter1, fighter2] = fighters;
  const baseUrl = "https://bigsnqhiqpvakxfhqcvu.supabase.co/storage/v1/object/public/Fighters/";

  return (
    <div className="w-[359px] h-[181px] relative">
      <div className="w-[359px] h-[181px] left-0 top-0 absolute bg-gradient-to-b from-red-500 to-slate-600 rounded-[10px]" />
      <img
        className="w-[100px] h-[100px] left-[41px] top-[38px] absolute rounded-full"
        src={`${baseUrl}${fighter1.InstagramURL}.jpg`}
        alt=""
      />
      <img
        className="w-[100px] h-[100px] left-[217px] top-[38px] absolute rounded-full"
        src={`${baseUrl}${fighter2.InstagramURL}.jpg`}
        alt=""
      />
      <div className="w-[100px] left-[41px] top-[134px] absolute text-center text-slate-100 text-md">
        {fighter1.Name}
      </div>
      <div className="w-[100px] left-[217px] top-[134px] absolute text-center text-slate-100 text-md">
        {fighter2.Name}
      </div>
      <div className="left-[107px] top-[8px] absolute text-center text-slate-700 text-[10px] ">
        {matchup.WeightClass} BOUT
      </div>
      <div className="w-3 left-[263px] top-[19px] absolute text-center text-white text-opacity-80 text-[10px] ">
        #5
      </div>
      <div className="w-[13px] h-[13px] left-[81px] top-[18px] absolute text-center text-amber-400 text-[10px] ">
        C
      </div>
    </div>
  );
}

export default DetailedMatchupCard;
