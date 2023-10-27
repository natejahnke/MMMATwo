import Octagon from "~/icons/Octagon";
import US from "~/icons/US";
import useFighterURLRecord from "~/hooks/useFighterRecord";
import fighterdefault from "~/images/fighterdefault.png";

const buildImageUrl = (baseUrl, imageId, options = {}) => {
  let url = `${baseUrl}${imageId}.jpg?format=origin`;

  const params = new URLSearchParams();
  if (options.width) params.append("width", options.width);
  if (options.height) params.append("height", options.height);

  const paramString = params.toString();
  if (paramString) url += `?${paramString}`;

  return url;
};

function MatchupCard({
  matchup,
  bgColor,
  viewTransitionName,
  fighter1,
  fighter2,
}) {
  const baseUrl =
    "https://bigsnqhiqpvakxfhqcvu.supabase.co/storage/v1/object/public/Fighters/";
  const defaultImage = fighterdefault;
  const fighter1ImageUrl = fighter1.InstagramURL
    ? buildImageUrl(baseUrl, fighter1.InstagramURL)
    : defaultImage;
  const fighter2ImageUrl = fighter2.InstagramURL
    ? buildImageUrl(baseUrl, fighter2.InstagramURL)
    : defaultImage;

  const parseName = (fullName) => {
    const parts = fullName.split(" ");
    const firstName = parts.shift();
    const lastName = parts.join(" ");
    return { firstName, lastName };
  };

  const { firstName: firstName1, lastName: lastName1 } = parseName(
    matchup.Fighter1Name
  );
  const { firstName: firstName2, lastName: lastName2 } = parseName(
    matchup.Fighter2Name
  );

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const fighter1Record = useFighterURLRecord(matchup.Fighter1URL);
  const fighter2Record = useFighterURLRecord(matchup.Fighter2URL);

  console.log("Fighter 1 Record:", fighter1Record);
  console.log("Fighter 2 Record:", fighter2Record);

  function renderOctagons() {
    const octagonCount = matchup.Title ? 5 : 3;
    return Array.from({ length: octagonCount }, (_, index) => (
      <Octagon key={index} />
    ));
  }

  const weightClassToWeight = (weightClass) => {
    const weightMap = {
      Strawweight: "115 lbs",
      Flyweight: "125 lbs",
      Bantamweight: "135 lbs",
      Featherweight: "145 lbs",
      Lightweight: "155 lbs",
      Welterweight: "170 lbs",
      Middleweight: "185 lbs",
      "Light Heavyweight": "205 lbs",
      Heavyweight: "265 lbs",
    };

    let isWomens = false;
    let lookupClass = weightClass;

    if (weightClass.startsWith("Women's ")) {
      isWomens = true;
      lookupClass = weightClass.replace("Women's ", "");
    }

    const weight = weightMap[lookupClass];

    return weight ? (isWomens ? `W ${weight}` : weight) : "Unknown";
  };

  const fighterWeight = weightClassToWeight(matchup.WeightClass);

  return (
    <div>
      <div className="text-xs text-secondary flex justify-between items-center w-full">
        <p className="self-start text-[10px]">#{matchup.FightNumber}</p>
        <h3 className="text-center flex-grow text-align-center">
          {matchup.WeightClass} Bout
        </h3>
        <div className="self-end" style={{ width: "1rem" }}></div>{" "}
        {/* Spacer to balance #1 */}
      </div>

      <div className="flex justify-between items-start relative w-full h-[196px] rounded-lg mb-2">
        {/* Fighter 1 */}
        <div className="relative">
          <img
            src={fighter1ImageUrl}
            alt={fighter1.Name}
            className="w-[158px] h-[196px] object-cover rounded-lg"
          />
          <div className="w-[158px] text-main leading-tight absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent rounded-bl-lg rounded-br-lg">
            {/* <div className="flex justify-between items-center text-tertiary">
            <div>
              <span className="text-xs">{fighter1Record}</span>
            </div>
            <div>
              <span className="text-xs">{fighterWeight}</span>
            </div>
          </div> */}
            <p className="text-sm uppercase">{firstName1}</p>
            <p className="text-sm uppercase">{lastName1}</p>
          </div>
        </div>

        {/* VS Text */}
        <div className="absolute left-1/2 top-1/2 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 text-sm text-tertiary">
          <span className="self-center mb-2">-VS-</span>
        </div>

        {/* Octagons at the bottom, centered horizontally */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0 mb-2">
          <div className="flex flex-col items-center space-y-1">
            {renderOctagons()}
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="relative">
          <img
            src={fighter2ImageUrl}
            alt={fighter2.Name}
            className="w-[158px] h-[196px] object-cover rounded"
          />
          <div className="w-[158px] text-main leading-tight absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent rounded-bl-lg rounded-br-lg">
            {/* <p className="text-sm uppercase">{firstName2}</p>
          <p className="text-sm uppercase">{lastName2}</p> */}
            {/* <div className="flex justify-between items-center text-tertiary">
            <div>
              <span className="text-xs">{fighter2Record}</span>
            </div>
            <div>
              <span className="text-xs">{fighterWeight}</span>
            </div>
          </div> */}
            <p className="text-sm uppercase">{firstName2}</p>
            <p className="text-sm uppercase">{lastName2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchupCard;
