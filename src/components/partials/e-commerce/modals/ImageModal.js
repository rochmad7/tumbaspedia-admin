import React from "react";
import { Button, Modal } from "bootstrap";

const ImageModal = ({ show, onHide, image }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Gambar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={image} width={700} height={1100} alt={image} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ImageModal;