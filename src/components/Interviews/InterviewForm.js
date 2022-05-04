import React, { Component } from "react";
import GroupsList from "./GroupsList";
import { Modal, Button } from "react-bootstrap";
import AddGroupToInterviewForm from "./AddGroupToInterviewForm";

export default class InterviewForm extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              id="interview-name"
              name="name"
              className="form-control"
              value={this.props.interview.name}
              onChange={this.props.handleInterviewChange}
            />
            <button className="btn btn-success" onClick={this.props.onSave}>
              Save Interview
            </button>
          </div>

          <AddGroupToInterviewForm
            handleGroupAddSubmit={this.props.handleGroupAddSubmit}
            groups={this.props.groups}
            handleChange={this.props.onChange}
            selectedGroupId={this.props.selectedGroupId}
            showModal={this.props.showModal}
          />

          <GroupsList
            focusGroups={this.props.interview.groups.focus.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            additionalGroups={this.props.interview.groups.additional.map(
              (groupId) =>
                this.props.groups.find((group) => group.id === groupId)
            )}
            handleNewAttrSubmit={this.props.handleAttrAdd}
            handleAttrRemove={this.props.handleAttrRemove}
          />

          <Modal
            show={this.props.createModalShow}
            onHide={this.props.hideModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.hideModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={this.props.handleCreateGroupSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}
