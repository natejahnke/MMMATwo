import React from "react";

function DetailedMatchupCardBody({ matchup, fighters }) {
  // Assuming fighters is an array with two objects for Fighter1 and Fighter2
  const [fighter1, fighter2] = fighters;

  return (
    <div className="relative flex items-center">
      <div className="flex content-center w-[359px] h-[250px] left-0 top-0 absolute bg-secondary rounded-[10px]" />
      <img
        className="w-[33px] h-[16.50px] left-[62px] top-[42px] absolute"
        src="https://via.placeholder.com/33x16"
        alt=""
      />
      <img
        className="w-[33px] h-[17.35px] left-[245px] top-[42px] absolute"
        src="https://via.placeholder.com/33x17"
        alt=""
      />
      <div className="left-[54px] top-[7px] absolute text-center text-slate-100 text-base ">
        {fighter1.Record}
      </div>
      <div className="left-[237px] top-[7px] absolute text-center text-slate-100 text-base ">
        {fighter2.Record}
      </div>
      <div className="left-[64px] top-[78px] absolute text-center text-slate-100 text-base ">
        {fighter1.Height}
      </div>
      <div className="left-[237px] top-[121px] absolute text-center text-slate-100 text-base ">
        {fighter2.Weight}
      </div>
      <div className="left-[52px] top-[117px] absolute text-center text-slate-100 text-base ">
        {fighter1.Weight}
      </div>
      <div className="left-[251px] top-[159px] absolute text-center text-slate-100 text-base ">
        {fighter2.Reach}
      </div>
      <div className="left-[66px] top-[155px] absolute text-center text-slate-100 text-base ">
        {fighter1.Reach}
      </div>
      <div className="left-[218px] top-[198px] absolute text-center text-slate-100 text-base ">
        {fighter2.DOB}
      </div>
      <div className="left-[27px] top-[198px] absolute text-center text-slate-100 text-base ">
        {fighter1.DOB}
      </div>
      <div className="left-[249px] top-[78px] absolute text-center text-slate-100 text-base ">
        {fighter2.Height}
      </div>
      <div className="left-[148px] top-[9px] absolute text-center text-slate-400 text-xs ">
        RECORD
      </div>
      <div className="left-[144px] top-[44px] absolute text-center text-slate-400 text-xs ">
        COUNTRY
      </div>
      <div className="left-[149px] top-[83px] absolute text-center text-slate-400 text-xs ">
        HEIGHT
      </div>
      <div className="left-[148px] top-[124px] absolute text-center text-slate-400 text-xs ">
        WEIGHT
      </div>
      <div className="left-[151px] top-[160px] absolute text-center text-slate-400 text-xs ">
        REACH
      </div>
      <div className="left-[143px] top-[201px] absolute text-center text-slate-400 text-xs ">
        BIRTHDAY
      </div>
      {/* <div className="left-[11px] top-[224px] absolute text-center text-slate-100 text-2xl ">
        16
      </div>
      <div className="left-[128px] top-[224px] absolute text-center text-slate-100 text-2xl ">
        6
      </div>
      <div className="left-[72px] top-[224px] absolute text-center text-slate-100 text-2xl ">
        0
      </div>
      <div className="left-[260px] top-[226px] absolute text-center text-slate-100 text-2xl ">
        4
      </div>
      <div className="left-[72px] top-[288px] absolute text-center text-slate-100 text-2xl ">
        0
      </div>
      <div className="left-[11px] top-[254px] absolute text-center text-slate-400 text-2xl ">
        KO
      </div>
      <div className="left-[56px] top-[254px] absolute text-center text-slate-400 text-2xl ">
        SUB
      </div>
      <div className="left-[244px] top-[254px] absolute text-center text-slate-400 text-2xl ">
        SUB
      </div>
      <div className="left-[68px] top-[315px] absolute text-center text-slate-400 text-2xl ">
        W
      </div>
      <div className="left-[121px] top-[254px] absolute text-center text-slate-400 text-2xl ">
        1
      </div>
      <div className="left-[133px] top-[256px] absolute text-center text-slate-400 text-[10px] ">
        ST
      </div>
      <div className="left-[132px] top-[267px] absolute text-center text-slate-400 text-[10px] ">
        ROUND
      </div>
      <div className="left-[89px] top-[337px] absolute origin-top-left -rotate-90 text-center text-slate-400 text-[6px] ">
        STREAK
      </div>
      <div className="left-[199px] top-[224px] absolute text-center text-slate-100 text-2xl ">
        11
      </div>
      <div className="left-[306px] top-[226px] absolute text-center text-slate-100 text-2xl ">
        9
      </div>
      <div className="left-[260px] top-[288px] absolute text-center text-slate-100 text-2xl ">
        3
      </div>
      <div className="left-[199px] top-[254px] absolute text-center text-slate-400 text-2xl ">
        KO
      </div>
      <div className="left-[256px] top-[315px] absolute text-center text-slate-400 text-2xl ">
        W
      </div>
      <div className="left-[302px] top-[254px] absolute text-center text-slate-400 text-2xl ">
        1
      </div>
      <div className="left-[314px] top-[256px] absolute text-center text-slate-400 text-[10px] ">
        ST
      </div>
      <div className="left-[313px] top-[267px] absolute text-center text-slate-400 text-[10px] ">
        ROUND
      </div>
      <div className="left-[277px] top-[337px] absolute origin-top-left -rotate-90 text-center text-slate-400 text-[6px] ">
        STREAK
      </div> */}
    </div>
  );
}

export default DetailedMatchupCardBody;
