import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { BiDotsVertical } from "react-icons/bi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdOutlineAccessTime, MdOutlineAccessTimeFilled } from "react-icons/md";
import { CgPlayListAdd } from "react-icons/cg";
import { BsPlayCircle } from "react-icons/bs";

// Image
import { videoImage } from "../../../utils/imageGenerator";

import {
  useDataContext,
  useGlobalContext,
  useAuthContext,
} from "../../../context";
import {
  addToLiked,
  removeFromLiked,
  addToWatchLater,
  removeFromWatchLater,
} from "../../../services";
import useClickOutside from "../../../hooks/useClickOutside";
import { format } from "../../../utils/dateFormat";

// Styles
import "./video-card.scss";

const VideoCard = ({ video }) => {
  const [open, setOpen] = useState(false);
  const domNode = useClickOutside(() => setOpen(false));

  const {
    _id,
    title,
    categoryName,
    creatorImg,
    creator,
    createdAt,
    stats: { viewCount },
  } = video;

  const {
    dataState,
    dataDispatch,
    handlers: { openPModal },
  } = useDataContext();

  const {
    liked: { items: likedVideos },
    watchLater: { items: watchLaterVideos },
  } = dataState;
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  const inLikedVideos = likedVideos.some((item) => item._id === _id);
  const inWatchLater = watchLaterVideos.some((item) => item._id === _id);

  const handleLike = () => {
    if (token) {
      if (inLikedVideos) removeFromLiked(_id, dataDispatch, openAlert);
      else addToLiked(video, dataDispatch, openAlert);
    } else {
      openAlert({ message: "You need to login first!", type: "warning" });
    }
  };

  const handleWatchLater = () => {
    if (token) {
      if (inWatchLater) removeFromWatchLater(_id, dataDispatch, openAlert);
      else addToWatchLater(video, dataDispatch, openAlert);
    } else {
      openAlert({ message: "You need to login first!", type: "warning" });
    }
  };

  const handleOpenPlaylist = () => {
    if (token) {
      openPModal(video);
    } else openAlert({ message: "You need to login first!", type: "warning" });
  };

  return (
    <article className="video-card">
      <Link to={`/explore/${_id}`}>
        <div className="video-card__img-container">
          <img src={videoImage(_id, "lg")} className="img-responsive" />
          <BsPlayCircle className="video-card__play" />
        </div>
      </Link>
      <div className="video-card__content">
        <figure className="avatar avatar-sm">
          <img className="avatar-img" src={creatorImg} alt="creator image" />
        </figure>
        <p className="video-card__content__title">{title}</p>

        <div className="menu" ref={domNode}>
          <BiDotsVertical
            className="menu__open-icon"
            onClick={() => setOpen((val) => !val)}
          />
          <ul className={`menu__items ${open ? "active" : ""}`}>
            <li onClick={handleLike}>
              {inLikedVideos && token ? (
                <AiFillLike className="item-active" />
              ) : (
                <AiOutlineLike />
              )}
            </li>
            <li onClick={handleWatchLater}>
              {inWatchLater && token ? (
                <MdOutlineAccessTimeFilled className="item-active" />
              ) : (
                <MdOutlineAccessTime />
              )}
            </li>
            <li onClick={handleOpenPlaylist}>
              <CgPlayListAdd />
            </li>
          </ul>
        </div>
      </div>
      <div className="video-card__info">
        <span>{creator}</span> <span>|</span> <span>{categoryName}</span>
        <p>
          <span>
            Aired on {new Date(createdAt).toLocaleDateString("en-US", format)}
          </span>
          <span>{viewCount} views</span>
        </p>
      </div>
    </article>
  );
};

export default VideoCard;
