import FightNightLogo from "./FightNightLogo";
import PPVLogo from "./PPVLogo";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function EventCard({ event, bgColor }) {
  // Extract the text after the semi-colon, remove any leading or trailing whitespace, and convert to uppercase.
  const eventName = (
    event.EventName.split(":")[1]?.trim() || event.EventName
  ).toUpperCase();

  const isLongName = eventName.length > 26;

  const formattedDate = formatDate(event.Date);

  return (
    <div
      className={[
        "relative w-[359px] h-[70px] mb-1 rounded-lg flex items-center",
        bgColor,
      ].join(" ")}
    >
      {/* UFC Logo Block */}
      <div className="flex-shrink-0">
        {event.PPV ? <PPVLogo numberValue={event.PPVNumber} /> : <FightNightLogo />}
      </div>

      {/* UFC Fight Night Text */}
      <div className="flex-grow flex items-center">
        <div
          className={`flex flex-col justify-center items-start ${
            isLongName
              ? "ml-1 relative"
              : "absolute inset-0 flex items-center justify-center"
          }`}
        >
          <span className="text-base text-secondary">{eventName}</span>
        </div>
      </div>

      {/* Event Date */}
      <div className="absolute -top-1 right-0 mt-1 mr-1 ">
        <span className="text-xs text-black py-[2px] px-1">{formattedDate}</span>
      </div>
      <div className="absolute bottom-1 text-xs text-center w-full">
        {event.Location}
        </div>
    </div>
  );
}

export default EventCard;
