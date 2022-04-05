import { useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";

import { useDataContext, useGlobalContext } from "../../../context";
import { removeFromHistory } from "../../../services/history";

// Image
import { videoImage } from "../../../utils/imageGenerator";

import "./horizontal-card.scss";

// Icons
import { BsPlayCircle } from "react-icons/bs";
import { BiDotsVertical } from "react-icons/bi";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { CgPlayListAdd } from "react-icons/cg";

const HorizontalCard = ({ video, type }) => {
  const [open, setOpen] = useState(false);
  const domNode = useClickOutside(() => setOpen(false));

  const { _id, title, creator } = video;

  const {
    dataDispatch,
    handlers: { openPModal },
  } = useDataContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  const handleDelete = () => {
    if (type === "history") {
      removeFromHistory(_id, dataDispatch, openAlert);
    }
  };

  const handleOPenPlaylist = () => openPModal(video);

  return (
    <article className="horizontal-card">
      <Link to={`/explore/${_id}`} className="horizontal-card__img-container">
        <img
          src={videoImage(_id, "lg")}
          className="img-responsive"
          alt={`${title}`}
        />
        <BsPlayCircle className="horizontal-card__play" />
      </Link>

      <div className="horizontal-card__content">
        <p className="horizontal-card__title t-margin-sm">{title}</p>
        <p>{creator}</p>
      </div>

      <div className="horizontal-card__menu menu" ref={domNode}>
        <BiDotsVertical
          className="menu__open-icon"
          onClick={() => setOpen((val) => !val)}
        />
        <ul className={`menu__items ${open ? "active" : ""}`}>
          <li onClick={handleOPenPlaylist}>
            <CgPlayListAdd />
          </li>
          <li onClick={handleDelete}>
            <RiDeleteBin7Fill />
          </li>
        </ul>
      </div>
    </article>
  );
};

export default HorizontalCard;
