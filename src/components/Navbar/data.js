import { SiHomeadvisor, SiAirplayvideo } from "react-icons/si";
import { BsPlayBtnFill } from "react-icons/bs";
import { AiFillLike, AiOutlineLogin } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";

export const navData = [
  { id: "n1", name: "Home", path: "/", icon: <SiHomeadvisor /> },
  { id: "n2", name: "Explore", path: "/explore", icon: <SiAirplayvideo /> },
  { id: "n3", name: "Liked", path: "/liked", icon: <AiFillLike /> },
  {
    id: "n4",
    name: "Watch Later",
    path: "/watchlater",
    icon: <MdWatchLater />,
  },
  { id: "n5", name: "Playlists", path: "/playlists", icon: <BsPlayBtnFill /> },
  { id: "n6", name: "History", path: "/history", icon: <BiHistory /> },
];

export const authNavigation = [
  { id: "n7", name: "Sign In", path: "/signin", icon: <AiOutlineLogin /> },
  { id: "n8", name: "Sign Up", path: "/signup", icon: <FaUserPlus /> },
];