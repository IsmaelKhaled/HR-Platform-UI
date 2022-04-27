import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.groups, action) {
  switch (action.type) {
    case types.ADD_ATTRIBUTE_SUCCESS:
      return state.map((group) =>
        group.id === action.group.id ? action.group : group
      );
    case types.REMOVE_ATTRIBUTE_SUCCESS:
      return state.map((group) =>
        group.id === action.group.id ? action.group : group
      );
    case types.LOAD_GROUPS_SUCCESS:
      return action.groups;
    case types.CREATE_GROUP_SUCCESS:
      return [...state, action.group];
    default:
      return state;
  }
}
