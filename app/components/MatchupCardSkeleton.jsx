function MatchupCardSkeleton() {
  return (
    <div className="relative w-[359px] h-[70px] mb-1 rounded-lg flex items-center bg-gray-300">
      {/* Weight Class */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-2xs bg-gray-400">
        Loading
      </div>
      {/* Fighter 1 Side */}
      <div className="flex items-center">
        <div className="ml-2 w-10 h-10 rounded-full bg-gray-400"></div>
        <div className="ml-[1px] mt-1">
          <p className="text-sm bg-gray-400">Loading</p>
          <div className="flex space-x-2 justify-end">
            <div className="text-xs bg-gray-400">Loading</div>
            <div className="text-xs bg-gray-400">Loading</div>
          </div>
        </div>
      </div>
      {/* Fighter 2 Side */}
      <div className="flex items-start ml-auto">
        <div className="flex flex-col mt-1 mr-[1px]">
          <p className="text-sm bg-gray-400">Loading</p>
          <div className="flex space-x-2 items-start">
            <div className="text-xs bg-gray-400">Loading</div>
            <div className="text-xs bg-gray-400">Loading</div>
          </div>
        </div>
        <div className="mr-2 w-10 h-10 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}

export default MatchupCardSkeleton;
