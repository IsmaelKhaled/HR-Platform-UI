import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class CreateGroupModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.hideModal}>
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
      </>
    );
  }
}
