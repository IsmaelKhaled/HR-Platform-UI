import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class RowDetailsModal extends Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onShow={this.props.onShow}
          onHide={this.props.onHide}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
