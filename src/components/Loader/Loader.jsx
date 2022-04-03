import "./loader.scss";

const Loader = () => {
  const numOfBalls = 5;
  return (
    <div className="loader-section">
      <div className="loader">
        {Array(numOfBalls)
          .fill(0)
          .map((item, index) => (
            <div
              key={`${item}${index}loader`}
              className={`loader__child`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Loader;
