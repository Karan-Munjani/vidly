import React from "react";
const InputField = (props) => {
  const { name, type, label, value, onChange, autoFocus, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className="form-control"
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputField;
