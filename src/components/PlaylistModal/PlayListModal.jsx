import React from "react";

import Modal from "../Modal/Modal";
import PlaylistInput from "./PlaylistInput";
import Playlist from "./Playlist";

import "./playlist-modal.scss";

const PlayListModal = () => {
  return (
    <Modal>
      <Playlist />
      <PlaylistInput />
    </Modal>
  );
};

export default PlayListModal;
