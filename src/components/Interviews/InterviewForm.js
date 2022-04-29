import React, { Component } from "react";

export default class InterviewForm extends Component {
  constructor({
    interview,
    groups,
    onSave,
    onChange,
    handleGroupAddSubmit,
    ...props
  }) {}
  render() {
    return (
      <>
        <div className="container">
          <AddGroupToInterviewForm
            handleGroupAddSubmit={this.handleGroupAddSubmit}
            groups={this.groups}
            handleChange={this.onChange}
            selectedGroupId={this.state.selectedGroupId}
            showModal={this.showModal}
          />
          <div className="input-group">
            <input
              id="interview-name"
              name="interviewName"
              placeholder="Interview Name"
              className="form-control"
              onChange={this.props.handleChange}
              value={this.interview.name}
            />
            <button className="btn btn-success" onClick={this.handleSave}>
              Save Interview
            </button>
          </div>

          <GroupsList
            focusGroups={this.state.focusGroupsIds.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            additionalGroups={this.state.additionalGroupsIds.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            handleNewAttrSubmit={this.handleAttrAdd}
            handleAttrRemove={this.handleAttrRemove}
          />

          <Modal show={this.state.createModalShow} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleCreateGroupSubmit}>
                <div className="input-group">
                  <input
                    id="newGroupName"
                    name="newGroupName"
                    placeholder="Group name"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleCreateGroupSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}
