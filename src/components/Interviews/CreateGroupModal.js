import React from "react";
import CenteredModal from "../Common/CenteredModal";

export default function CreateGroupModal(props) {
  return (
    <CenteredModal
      title="Create New Group"
      show={props.show}
      onHide={props.hideModal}
      onSubmit={props.handleCreateGroupSubmit}
    >
      <form onSubmit={props.handleCreateGroupSubmit}>
        <div className="input-group">
          <input
            id="newGroupName"
            name="newGroupName"
            placeholder="Group name"
            className="form-control"
            onChange={props.onChange}
          />
        </div>
      </form>
    </CenteredModal>
  );
}
