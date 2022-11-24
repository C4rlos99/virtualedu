import React from "react";
import { Form } from "react-bootstrap";
import "../style.css";

export default function InputForm(props) {
  const {
    controlId,
    label,
    placeHolder,
    value,
    feedBack,
    type,
    name,
    handleChange,
    activo = true,
  } = props;
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        disabled={!activo}
        placeholder={placeHolder}
        value={value}
        type={type}
        name={name}
        onChange={(e) => handleChange(e.target.value)}
      />
      <p className="error-msg">{feedBack}</p>
    </Form.Group>
  );
}
