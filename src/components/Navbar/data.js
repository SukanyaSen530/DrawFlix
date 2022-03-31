import { SiHomeadvisor } from "react-icons/si";
import { BsPlayBtnFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { BiHistory } from "react-icons/bi";

export const navData = [
  { id: "n1", name: "Home", path: "/", icon: <SiHomeadvisor /> },
  { id: "n2", name: "Playlist", path: "/playlist", icon: <BsPlayBtnFill /> },
  {
    id: "n3",
    name: "Watch Later",
    path: "/watchlater",
    icon: <AiFillLike />,
  },
  { id: "n4", name: "Like", path: "/like", icon: <MdWatchLater /> },
  { id: "n5", name: "History", path: "/history", icon: <BiHistory /> },
];
