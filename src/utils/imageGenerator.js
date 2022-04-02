export const videoImage = (videoId, type = "sm") => {
  if (type === "sm") return `https://i.ytimg.com/vi/${videoId}/default.jpg`;
  else if (type === "md")
    return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  else if (type === "lg")
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  else return "";
};
