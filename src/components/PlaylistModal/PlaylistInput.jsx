import { useState } from "react";

import "./playlist-input.scss";

const PlaylistInput = () => {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="playlist-input">
      <form onSubmit={handleSubmit}>
        <input
          className="playlist-input__field"
          placeholder="Enter playlist name"
          required
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />

        <button
          className="playlist-input__btn btn-icon btn-sm secondaryDark"
          type="submit"
        >
          <i class="fa-solid fa-file-circle-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default PlaylistInput;
