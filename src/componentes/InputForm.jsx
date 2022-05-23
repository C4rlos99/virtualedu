import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "../style.css";

export default function InputForm(props) {
  const {
    controlId,
    label,
    placeholder,
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
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        onChange={(e) => handleChange(e.target.value)}
      />
      <p className="error-msg">{feedBack}</p>
    </Form.Group>
  );
}

InputForm.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
};
