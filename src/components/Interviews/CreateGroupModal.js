import React, { Component } from "react";
import CenteredModal from "../Common/CenteredModal";

export default class CreateGroupModal extends Component {
  render() {
    return (
      <>
        <CenteredModal
          title="Create New Group"
          show={this.props.show}
          onHide={this.props.hideModal}
          onSubmit={this.props.handleCreateGroupSubmit}
        >
          <form onSubmit={this.props.handleCreateGroupSubmit}>
            <div className="input-group">
              <input
                id="newGroupName"
                name="newGroupName"
                placeholder="Group name"
                className="form-control"
                onChange={this.props.onChange}
              />
            </div>
          </form>
        </CenteredModal>
      </>
    );
  }
}
