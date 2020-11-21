import Cookies from "universal-cookie";
import { get } from "lodash";
import ActionTypes from "../actionTypes";

export const initialState = {
  fetching: undefined,
};

const cookies = new Cookies();

export default (state = initialState, action) => {
  switch (action.type) {
    /**
     * AUTH_SIGN_IN
     */
    case ActionTypes.AUTH_SIGN_IN_REQUESTING:
      return {
        ...state,
        fetching: true,
      };

    case ActionTypes.AUTH_SIGN_IN_SUCCESS:
      cookies.set("urm-token", get(action, "data.token"), {
        path: "/",
      });
      return {
        ...state,
        data: action.data,
        fetching: false,
      };

    case ActionTypes.AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.error,
        fetching: false,
      };

    /**
     * AUTH_SIGN_OUT
     */
    case ActionTypes.AUTH_SIGN_OUT:
      cookies.remove("urm-token", { path: "/" });
      return initialState;

    default:
      return state;
  }
};
