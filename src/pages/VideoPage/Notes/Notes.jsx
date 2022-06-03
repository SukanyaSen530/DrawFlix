import { useState, useEffect } from "react";

import { useDataContext, useGlobalContext } from "../../../context";
import { Loader, NotesModal } from "../../../components";

import {
  loadAllNotes,
  createNote,
  deleteNote,
  deleteAllNotes,
  updateNote,
} from "../../../services";

import "./notes.scss";

const Notes = ({ video, videoRef }) => {
  const {
    dataState: {
      notes: { item: videoNotes, loading, error },
    },
    dataDispatch,
  } = useDataContext();

  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  const secondsToTime = (t) =>
    `${Math.floor(t / 3600)
      .toString()
      .padStart(2, "0")}:${Math.floor((t % 3600) / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(t % 60)
      .toString()
      .padStart(2, "0")}`;

  const comparator = (note1, note2) => note2.time - note1.time;

  useEffect(() => {
    loadAllNotes(video._id, dataDispatch);
  }, []);

  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState({ type: false, noteId: null });

  const handleNotesModal = () => {
    setOpenNotesModal((val) => !val);
    setDescription("");
    setIsEdit({ type: false, noteId: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit.type) {
      updateNote(
        { videoId: video._id, noteId: isEdit.noteId },
        description,
        dataDispatch,
        openAlert
      );
    } else {
      const note = { description, time: videoRef.current.getCurrentTime() };
      createNote(video._id, note, dataDispatch, openAlert);
    }
    handleNotesModal();
  };

  const handleDelete = (noteId) => {
    deleteNote({ videoId: video._id, noteId }, dataDispatch, openAlert);
  };

  const handleClearAll = () => {
    deleteAllNotes(video._id, dataDispatch, openAlert);
  };

  const handleUpdate = (note_id, description) => {
    handleNotesModal();
    setIsEdit({ type: true, noteId: note_id });
    setDescription(description);
  };

  if (loading) return <Loader size="md" />;

  if (error)
    return (
      <p className="danger-text">Error loading Notes for the {video.title}</p>
    );

  return (
    <section className="notes">
      <div className="notes__header">
        <h4 className="h4">Notes for {video.title}</h4>
        <button
          className="btn btn-float defaultDark btn-sm"
          onClick={handleNotesModal}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="notes__content scrollbar">
        {!videoNotes?.notes?.length ? (
          <p>You have not added any notes for this video.. Add Note 🚀</p>
        ) : (
          <>
            <button
              className="btn btn-contained danger btn-sm right-aligned"
              onClick={handleClearAll}
            >
              Clear Notes
            </button>

            {videoNotes.notes?.sort(comparator).map((note) => (
              <div key={note._id} className="note-card">
                <div>
                  <p className="note-card__description">{note.description}</p>
                  <span className="note-card__time">
                    {secondsToTime(note.time)}
                  </span>
                </div>
                <ul className="note-card__actions">
                  <li onClick={() => handleDelete(note._id)}>
                    Delete <i className="fa-solid fa-trash"></i>
                  </li>
                  <li onClick={() => handleUpdate(note._id, note.description)}>
                    Update <i className="fa-solid fa-pen-to-square"></i>
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}
      </div>

      {openNotesModal ? (
        <NotesModal
          open={openNotesModal}
          onClose={handleNotesModal}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />
      ) : null}
    </section>
  );
};

export default Notes;
