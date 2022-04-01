import { globalActions } from "../actions/globalActions";

const globalReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case globalActions.OPEN_ALERT:
      return {
        ...state,
        alert: { show: true, message: payload.message, type: payload.type },
      };

    case globalActions.CLOSE_ALERT:
      return { ...state, alert: { show: false, message: "", type: "" } };
  }
};

export default globalReducer;
