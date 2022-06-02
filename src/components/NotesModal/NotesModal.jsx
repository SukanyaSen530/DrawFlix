import Modal from "../Modal/Modal";

import "./notes-modal.scss";

const NotesModal = ({
  open = false,
  onClose = () => {},
  description = "",
  setDescription = () => {},
  handleSubmit = () => {},
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="notes-modal">
        <label htmlFor="description" className="notes-modal__label">
          <span>Note Description</span>
          <span>{description.length} / 300</span>
        </label>
        <textarea
          className="notes-modal__textarea scrollbar"
          name="decsription"
          placeholder="Note Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minLength={10}
          maxLength={300}
          rows={5}
        />

        <button
          className="btn btn-contained btn-sm block-btn defaultDark t-margin-sm notes-modal__btn"
          type="submit"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </Modal>
  );
};

export default NotesModal;
