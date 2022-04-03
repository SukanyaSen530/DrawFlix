import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { addToLiked, removeFromLiked } from "../../../services/likes";
import useClickOutside from "../../../hooks/useClickOutside";

// Styles
import "./video-card.scss";

const VideoCard = ({ _id, title, categoryName, creatorImg, creator }) => {
  const [open, setOpen] = useState(false);
  const domNode = useClickOutside(() => setOpen(false));
  const navigate = useNavigate();

  const video = { _id, title, categoryName, creatorImg, creator };

  const { dataState, dataDispatch } = useDataContext();
  const {
    liked: { items: likedVideos },
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

  const handleLike = () => {
    if (token) {
      if (inLikedVideos) removeFromLiked(videoId, dataDispatch, openAlert);
      else addToLiked(video, dataDispatch, openAlert);
    } else {
      navigate("/signin");
    }
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
            <li onClick={() => alert("watch later")}>
              <MdOutlineAccessTime />
            </li>
            <li onClick={() => alert("add to playlist")}>
              <CgPlayListAdd />
            </li>
          </ul>
        </div>
      </div>
      <div className="video-card__info">
        <span>{creator}</span> <span>|</span> <span>{categoryName}</span>
      </div>
    </article>
  );
};

export default VideoCard;
