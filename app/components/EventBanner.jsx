function EventBanner({ event }) {
  // console.log("Received event in EventBanner:", event);  // Debugging line

  if (!event || !event.EventName) {
    return <div>Loading...</div>;
  }

  const [prefix, rest] = event.EventName.split(":");
  const [fighter1, fighter2] = rest ? rest.split("vs.") : ["", ""];

  return (
    <div
      id="fightsBanner"
      className="mb-2 w-[359px] h-[150px] bg-secondary rounded-lg flex flex-col items-center justify-center relative"
    >
      <h1 className="pt-6 text-2xl text-main uppercase leading-tight mb-[-2px]">{prefix.trim()}</h1>
      <h2 className="text-lg text-main uppercase leading-tight mb-[-2px]">{fighter1.trim()}</h2>
      <h3 className="text-lg text-main uppercase leading-tight mb-[-2px]">vs.</h3>
      <h4 className="text-lg text-main uppercase leading-tight mb-[-2px]">{fighter2.trim()}</h4>
      <p className="text-md text-tertiary absolute mt-1 top-0 right-3">{event.Date}</p>
      <p className="text-md text-tertiary mb-2">
        {event.Location}
      </p>
    </div>
  );
}

export default EventBanner;
