import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  let node = useRef();

  let handleClick = (e) => {
    if (!node?.current?.contains(e.target)) {
      handler();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  });

  return node;
};

export default useClickOutside;
