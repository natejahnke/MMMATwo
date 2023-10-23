import { useFighter } from "~/hooks/useFighter";
import MatchupCard from "~/components/MatchupCard";
import { Link } from "@remix-run/react";

export default function MatchupContainer({ matchup, index }) {
  const fighter1 = useFighter(matchup.Fighter1URL);
  const fighter2 = useFighter(matchup.Fighter2URL);

  return (
    <Link to={`/matchup/${matchup.EventFightID}`} key={matchup.EventFightID}>
      <MatchupCard
        fighter1={fighter1.read()}
        fighter2={fighter2.read()}
        matchup={matchup}
        bgColor={index % 2 === 0 ? "bg-red-gradient" : "bg-blue-gradient"}
      />
    </Link>
  );
}
