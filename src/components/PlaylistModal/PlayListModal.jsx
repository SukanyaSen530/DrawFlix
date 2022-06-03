import Modal from "../Modal/Modal";
import PlaylistInput from "./PlaylistInput";
import Playlist from "./Playlist";

import { useDataContext } from "../../context";

const PlayListModal = () => {
  const {
    dataState: {
      playlist: { playlistModal, items: playlists },
    },
    handlers: { closePModal },
  } = useDataContext();

  return (
    <Modal open={playlistModal} onClose={closePModal}>
      {playlists?.length > 0 && <Playlist playlists={playlists} />}
      <PlaylistInput />
    </Modal>
  );
};

export default PlayListModal;
