import { useEffect } from "react";

const useDocumentTitle = (pathName) => {
  useEffect(() => {
    document.title = `${pathName[0].toUpperCase()}${pathName.slice(
      1
    )} | Drawflix`;
  }, [pathName]);
};

export default useDocumentTitle;
