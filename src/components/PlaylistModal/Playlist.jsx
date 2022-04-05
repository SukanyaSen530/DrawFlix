import "./playlist.scss";

const Playlist = ({ playlists }) => {
  return (
    <div className="playlist">
      {playlists?.map((item) => (
        <div className="playlist__input-container" key={item._id}>
          <input type="checkbox" className="playlist__input" value={item._id} />
          <label className="playlist__label">{item.title}</label>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
