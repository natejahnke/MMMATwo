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

  function formatName(fullName) {
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");
    return `${firstName.charAt(0)}. ${lastName}`;
  }

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const fighter1Record = useFighterURLRecord(matchup.Fighter1URL);
  const fighter2Record = useFighterURLRecord(matchup.Fighter2URL);

  console.log("Fighter 1 Record:", fighter1Record); // Log Fighter 1 Record
  console.log("Fighter 2 Record:", fighter2Record); // Log Fighter 2 Record

  function renderOctagons() {
    const octagonCount = matchup.Title ? 5 : 3;
    return Array.from({ length: octagonCount }, (_, index) => (
      <Octagon key={index} />
    ));
  }

  return (
    <div
      className={[
        "relative w-[359px] h-[70px] mb-1 rounded-lg flex items-center",
        bgColor,
        viewTransitionName,
      ].join(" ")}
    >
      {/* <!-- Weight Class --> */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-2xs text-quaternary">
        {matchup.WeightClass} Bout
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-2xs text-quaternary flex">
        {/* <img src="/public/images/octagon.svg" alt="Description" />
        <img src="/public/images/octagon.svg" alt="Description" />
        <img src="/public/images/octagon.svg" alt="Description" /> */}
        {renderOctagons()}
      </div>
      {/* <!-- Fighter 1 Side --> */}
      <div className="flex items-center">
        <img
          src={fighter1ImageUrl}
          alt="Fighter 1"
          className="ml-2 w-10 h-10 rounded-lg"
          onError={handleImageError}
        />
        <div className="ml-[1px] mt-1">
          <p className="text-sm text-secondary uppercase">
            {formatName(matchup.Fighter1Name)}
          </p>
          {/* <!-- Other Fighter 1 details can go here --> */}
          <div className="flex space-x-2 items-start">
            
            {/* <div className="text-xs">
              
              <US />
            </div> */}
            <div className="text-xs text-five">{fighter1Record}</div>
          </div>
        </div>
      </div>

      {/* <!-- Fighter 2 Side --> */}
      <div className="flex items-start ml-auto">
        <div className="flex flex-col mt-1 mr-[1px]">
          <p className="text-sm text-secondary uppercase">
            {formatName(matchup.Fighter2Name)}
          </p>
          {/* <!-- Other Fighter 2 details can go here --> */}
          <div className="flex space-x-2 items-start">
            {/* <div className="text-xs">
            
              <US />
            </div> */}
            <div className="text-xs text-five">{fighter2Record}</div>
          </div>
        </div>
        <img
          src={fighter2ImageUrl}
          alt="Fighter 2"
          className="mr-2 w-10 h-10 rounded-full"
          onError={handleImageError}
        />
      </div>
    </div>
  );
}

export default MatchupCard;
