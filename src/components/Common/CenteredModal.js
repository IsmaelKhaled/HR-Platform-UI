import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class CenteredModal extends Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onShow={this.props.onShow}
          onHide={this.props.onHide}
          size={this.props.size}
          dialogClassName={this.props.dialogClassName}
          centered
        >
          <Modal.Header closeButton>
            {this.props.title && <Modal.Title>{this.props.title}</Modal.Title>}
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          {(this.props.onSubmit || this.props.footer) && (
            <Modal.Footer>
              {this.props.onSubmit && (
                <Button variant="primary" onClick={this.props.onSubmit}>
                  Submit
                </Button>
              )}
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }
}
