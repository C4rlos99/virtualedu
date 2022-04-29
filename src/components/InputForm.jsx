import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "../style.css"

export default function InputForm({
  controlId,
  label,
  placeholder,
  value,
  errorMsg,
  type,
  name,
  onChangeHandler,
}) {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <p className="error-msg">{errorMsg}</p>
    </Form.Group>
  );
}

InputForm.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
} 