import ActionTypes from "../actionTypes";

export function load() {
  return {
    type: ActionTypes.LOAD_PROFILE,
    url: "/profile",
  };
}

export function update(data: any) {
  return {
    data,
    method: "put",
    type: ActionTypes.UPDATE_PROFILE,
    url: "/profile",
  };
}
