import { useReducer, useContext, createContext } from "react";
import { globalActions } from "../actions/globalActions";

import globalReducer from "../reducers/globalReducer";

const globalContext = createContext();

const initialState = {
  alert: {
    show: false,
    message: "",
    type: "",
  },
  playlistModal: {
    show: false,
  },
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const openAlert = (payload) =>
    dispatch({ type: globalActions.OPEN_ALERT, payload });

  const closeAlert = () => dispatch({ type: globalActions.CLOSE_ALERT });

  const openPModal = () => dispatch({ type: globalActions.OPEN_ALERT });
  const closePModal = () => dispatch({ type: globalActions.CLOSE_MODAL });

  return (
    <globalContext.Provider
      value={{
        globalState: state,
        globalHandlers: { openAlert, closeAlert, openPModal, closePModal },
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

const useGlobalContext = () => useContext(globalContext);

export { GlobalProvider, useGlobalContext };
