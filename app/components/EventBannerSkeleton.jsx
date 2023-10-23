function EventBannerSkeleton() {
  return (
    <div className="mb-2 w-[359px] h-[150px] bg-gray-300 rounded-lg flex flex-col items-center justify-center relative">
      <div className="bg-gray-400 w-1/4 h-6 mb-2"></div>
      <div className="bg-gray-400 w-1/3 h-6 mb-2"></div>
      <div className="bg-gray-400 w-1/5 h-6 mb-2"></div>
      <div className="bg-gray-400 w-1/3 h-6 mb-2"></div>
      <div className="bg-gray-400 w-1/4 h-4 absolute mt-1 top-0 right-3"></div>
      <div className="bg-gray-400 w-1/4 h-4 mb-2"></div>
    </div>
  );
}

export default EventBannerSkeleton;
