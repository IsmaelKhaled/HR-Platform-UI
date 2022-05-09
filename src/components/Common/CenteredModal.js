import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function CenteredModal(props) {
  return (
    <>
      <Modal
        show={props.show}
        onShow={props.onShow}
        onHide={props.onHide}
        size={props.size}
        dialogClassName={props.dialogClassName}
        centered
      >
        <Modal.Header closeButton>
          {props.title && <Modal.Title>{props.title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        {(props.onSubmit || props.footer) && (
          <Modal.Footer>
            {props.onSubmit && (
              <Button variant="primary" onClick={props.onSubmit}>
                Submit
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
