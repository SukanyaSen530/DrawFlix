import reactDom from "react-dom";
import { IoClose } from "react-icons/io5";

import "./modal.scss";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return reactDom.createPortal(
    <article className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <IoClose className="modal-content__close-btn" onClick={onClose} />
      </div>
    </article>,
    document.getElementById("modal-root")
  );
};

export default Modal;
