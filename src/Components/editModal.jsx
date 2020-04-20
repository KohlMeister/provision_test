import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-bootstrap/Modal";

class ExampleModal extends React.Component {
  show = React.useState(false);
  setShow = React.useState(false);

  handleClose = () => React.setIsOpen(false);
  handleShow = () => React.setIsOpen(true);

  render() {
    return (
      <>
        <button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </button>
  
        <Modal show={this.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={this.handleClose}>
              Close
            </button>
            <button variant="primary" onClick={this.handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ExampleModal;