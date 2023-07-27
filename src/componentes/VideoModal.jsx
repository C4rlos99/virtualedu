import React from "react";
import { Modal } from "react-bootstrap";

export default function VideoModal(props) {
  const { show, onHide, localizacion } = props;

  return (
    <Modal className="modal-video" show={show} onHide={onHide} centered>
      <video autoPlay controls>
        <source src={`http://13.53.168.115:8000/${localizacion}`} type="video/mp4" />
      </video>
    </Modal>
  );
}
