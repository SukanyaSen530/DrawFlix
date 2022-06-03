import { useState } from "react";

import { useDataContext, useGlobalContext } from "../../../context";
import { NotesModal } from "../../../components";

import "./notes.scss";

const Notes = ({ videoName, videoRef }) => {
  const {
    dataState: {
      notes: { items: videoNotes, loading, error },
    },
  } = useDataContext();

  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [description, setDescription] = useState("");
  const handleNotesModal = () => {
    setOpenNotesModal((val) => !val);
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleDelete = () => {};
  const updateDelete = () => {};

  return (
    <section className="notes">
      <div className="notes__header">
        <h4 className="h4">Notes for {videoName}</h4>
        <button
          className="btn btn-float defaultDark btn-sm"
          onClick={handleNotesModal}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="notes__content scrollbar">
        {videoNotes?.length === 0 ? (
          <p>You have not added any notes for this video.. Add Note 🚀</p>
        ) : (
          videoNotes?.map((note) => (
            <div key={note._id} className="note-card">
              <p className="note-card__description">{note.description}</p>
              <span className="note-card__time">{note.time}</span>
            </div>
          ))
        )}
      </div>

      {openNotesModal ? (
        <NotesModal
          open={openNotesModal}
          onClose={handleNotesModal}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />
      ) : null}
    </section>
  );
};

export default Notes;
