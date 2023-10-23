// PPVLogo.jsx
function PPVLogo({ numberValue }) {
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
        <div className="absolute left-4 top-10 w-[12px] h-0 border-b-2 border-black"></div>
        {/* Wrapper for skew */}
        <div className="-skew-x-12">
          {/* Number Text */}
          <div className="relative -top-2 left-2 text-center text-black text-[10px] font-black">
            {numberValue}
          </div>
        </div>
      </div>
    );
  }
  
  export default PPVLogo;
  