import "./tab.scss";

const Chip = ({ name = "", isActive = false, handleClick = () => {} }) => {
  return (
    <button
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => handleClick(name)}
    >
      <span>{name}</span>
    </button>
  );
};

export default Chip;
