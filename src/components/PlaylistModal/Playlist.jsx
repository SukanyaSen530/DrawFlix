import "./playlist.scss";

const Playlist = () => {
  return (
    <div className="playlist">
      <div className="playlist__input-container">
        <input type="checkbox" className="playlist__input" />
        <label className="playlist__label">Dummy Playlist</label>
      </div>
    </div>
  );
};

export default Playlist;
