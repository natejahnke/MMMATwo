import { NavLink, useLocation } from "@remix-run/react";
import HomeIcon from "~/icons/HomeIcon";
import RankIcon from "~/icons/RankIcon";
import BackIcon from "~/icons/BackIcon";

export default function BottomNavbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const activeClass = "text-primary";
  const inactiveClass = "text-six";
  const hoverClass = "hover:text-third";

  const goBack = () => {  // <-- Added this function
    window.history.back();  // Use native window.history object
  };

  return (
    <nav className="w-[375px] h-[70px] bg-secondary flex justify-between items-center px-4 rounded-lg">
      <div  // <-- Changed this from NavLink to div
        onClick={goBack}  // <-- Added this line
        className={`flex flex-col items-center justify-center ${
          isActive("/back") ? activeClass : inactiveClass
        } ${hoverClass}`}
      >
        {/* SVG for Back Button */}
        <BackIcon isActive={isActive("/back")} />
        </div>

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
        to="/leaderboard"
        className={`flex flex-col items-center justify-center ${
          isActive("/leaderboard") ? activeClass : inactiveClass
        } ${hoverClass}`}
      >
        {/* SVG for Leaderboard Button */}
        <RankIcon isActive={isActive("/leaderboard")} />
      </NavLink>
    </nav>
  );
}
