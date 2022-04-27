import * as types from "./actionTypes";
import * as groupApi from "../../api/groupApi";

export function loadGroupsSuccess(groups) {
  return { type: types.LOAD_GROUPS_SUCCESS, groups };
}

export function addAttributeSuccess(group) {
  return { type: types.ADD_ATTRIBUTE_SUCCESS, group };
}

export function removeAttributeSuccess(group) {
  return { type: types.REMOVE_ATTRIBUTE_SUCCESS, group };
}

export function createGroupSuccess(group) {
  return { type: types.CREATE_GROUP_SUCCESS, group };
}

export function loadGroups() {
  return function (dispatch) {
    return groupApi
      .getGroups()
      .then((groups) => {
        dispatch(loadGroupsSuccess(groups));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addAttribute(group, attr) {
  return function (dispatch) {
    return groupApi
      .addAttribute(group, attr)
      .then((updatedGroup) => {
        dispatch(addAttributeSuccess(updatedGroup));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function removeAttribute(group, attr) {
  return function (dispatch) {
    return groupApi
      .removeAttribute(group, attr)
      .then((updatedGroup) => {
        dispatch(removeAttributeSuccess(updatedGroup));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createGroup(name) {
  return function (dispatch) {
    return groupApi
      .createGroup(name)
      .then((group) => {
        dispatch(createGroupSuccess(group));
      })
      .catch((error) => {
        throw error;
      });
  };
}
