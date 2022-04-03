import { useState } from "react";
import { Link } from "react-router-dom";

import { videoImage } from "../../../utils/imageGenerator";
import useClickOutside from "../../../hooks/useClickOutside";

import "./video-card.scss";

import { BiDotsVertical } from "react-icons/bi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdOutlineAccessTime, MdOutlineAccessTimeFilled } from "react-icons/md";
import { CgPlayListAdd } from "react-icons/cg";
import { BsPlayCircle } from "react-icons/bs";

const VideoCard = ({ _id, title, categoryName, creatorImg, creator }) => {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => setOpen(false));

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
            <li onClick={() => alert("like")}>
              <AiOutlineLike />
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
