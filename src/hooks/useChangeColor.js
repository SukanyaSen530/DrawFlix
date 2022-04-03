import { useEffect } from "react";

const useChangeColor = (handler) => {
  const changeColor = () => {
    if (window.scrollY > 90) handler(true);
    else handler(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);

    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  });
};

export default useChangeColor;
