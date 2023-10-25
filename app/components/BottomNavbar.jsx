import { useLocation, useNavigate, NavLink } from "@remix-run/react";
import HomeIcon from "~/icons/HomeIcon";
import RankIcon from "~/icons/RankIcon";
import BackIcon from "~/icons/BackIcon";

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const activeClass = "text-primary";
  const inactiveClass = "text-six";
  const hoverClass = "hover:text-third";

  return (
    <nav className="w-[375px] h-[70px] bg-secondary flex justify-between items-center px-4 rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className={`flex flex-col items-center justify-center ${
          isActive("/back") ? activeClass : inactiveClass
        } ${hoverClass}`}
      >
        {/* SVG for Back Button */}
        <BackIcon isActive={isActive("/back")} />
      </button>

      <NavLink
        to="/events"
        className={`flex flex-col items-center justify-center ${
          isActive("/events") ? activeClass : inactiveClass
        } ${hoverClass}`}
      >
        {/* SVG for Home Button */}
        <HomeIcon />
      </NavLink>

      <NavLink
        to="/fighters"
        className={`flex flex-col items-center justify-center ${
          isActive("/fighters") ? activeClass : inactiveClass
        } ${hoverClass}`}
      >
        {/* SVG for Leaderboard Button */}
        <RankIcon isActive={isActive("/fighters")} />
      </NavLink>
    </nav>
  );
}
