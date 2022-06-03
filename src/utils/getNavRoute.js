import { useLocation } from "react-router-dom";

export const getNavRoute = () => {
  const location = useLocation();
  const routesName = [
    "home",
    "explore",
    "liked",
    "watchlater",
    "playlists",
    "history",
    "signin",
    "signup",
    "profile",
  ];

  const showPathName = location.pathname.split("/")[1];
  let correctPathName = "";

  if (showPathName === "") correctPathName = "home";
  else if (routesName.includes(showPathName)) correctPathName = showPathName;
  else correctPathName = "not found";

  return correctPathName;
};
