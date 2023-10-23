// FightNightLogo.jsx
function FightNightLogo() {
    return (
      <div className="ml-4 flex flex-col items-center justify-center">
        {/* Wrapper for skew */}
        <div className="-skew-x-12">
          {/* UFC Text */}
          <div className="relative text-center text-black text-[20px] font-black">
            UFC
          </div>
        </div>
        {/* Line under 'U' */}
        {/* <div className="absolute left-2 top-9 w-[16px] h-0 border-b-4 border-black"></div> */}
        {/* Wrapper for skew */}
        <div className="flex flex-row items-center -skew-x-12 -mt-2">
          {/* FIGHT Text */}
          <div className="relative text-center text-black text-[10px] font-black">
            FIGHT
          </div>
          {/* NIGHT Text */}
          <div className="relative text-center text-black text-[6px] font-black">
            NIGHT
          </div>
        </div>
      </div>
    );
  }
  
  export default FightNightLogo;
  