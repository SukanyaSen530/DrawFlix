import { useState } from "react";

import "./playlist-input.scss";

import { useDataContext, useGlobalContext } from "../../context";
import { createPlaylist } from "../../services";

const PlaylistInput = () => {
  const [title, setTitle] = useState("");

  const { dataDispatch } = useDataContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  const handleSubmit = (e) => {
    const regex = /^[^-\s][a-zA-Z0-9_\s-]+$/;
    e.preventDefault();
    if (regex.test(title) && title.length !== 0) {
      createPlaylist({ title }, dataDispatch, openAlert);
      setTitle("");
    } else
      openAlert({
        message:
          "Title can not contain empty spaces/trailing spaces or special characters!",
        type: "error",
      });
  };

  return (
    <div className="playlist-input">
      <form onSubmit={handleSubmit}>
        <input
          className="playlist-input__field"
          placeholder="Enter playlist name"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="playlist-input__btn btn-icon btn-sm secondary"
          type="submit"
        >
          <i className="fa-solid fa-file-circle-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default PlaylistInput;
