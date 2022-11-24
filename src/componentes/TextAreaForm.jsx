import React from "react";
import { Form } from "react-bootstrap";
import "../style.css";

export default function TextAreaForm(props) {
  const {
    controlId,
    label,
    placeHolder,
    value,
    feedBack,
    name,
    handleChange,
    activo = true,
  } = props;
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        disabled={!activo}
        placeholder={placeHolder}
        as="textarea"
        rows={3}
        value={value}
        name={name}
        onChange={(e) => handleChange(e.target.value)}
      />
      {<p className="error-msg">{feedBack}</p>}
    </Form.Group>
  );
}
