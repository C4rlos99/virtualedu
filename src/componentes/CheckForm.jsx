import React from "react";
import { Form } from "react-bootstrap";

export default function CheckForm(props) {
  const {
    controlId,
    label,
    checked,
    name,
    handleChange,
    activo = true,
  } = props;
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <div className="d-flex align-items-center flex-column">
        <Form.Label>{label}</Form.Label>
        <Form.Check
          disabled={!activo}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => {
            handleChange(e.target.checked);
          }}
        />
      </div>
    </Form.Group>
  );
}
