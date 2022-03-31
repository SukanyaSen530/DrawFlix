import { SiHomeadvisor, SiAirplayvideo } from "react-icons/si";
import { BsPlayBtnFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { BiHistory } from "react-icons/bi";

export const navData = [
  { id: "n1", name: "Home", path: "/", icon: <SiHomeadvisor /> },
  { id: "n2", name: "Explore", path: "/expore", icon: <SiAirplayvideo /> },
  { id: "n3", name: "Playlist", path: "/playlists", icon: <BsPlayBtnFill /> },
  {
    id: "n4",
    name: "Watch Later",
    path: "/watchlater",
    icon: <AiFillLike />,
  },
  { id: "n5", name: "Like", path: "/liked", icon: <MdWatchLater /> },
  { id: "n6", name: "History", path: "/history", icon: <BiHistory /> },
];
