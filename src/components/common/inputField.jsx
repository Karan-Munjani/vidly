import React from "react";
const InputField = (props) => {
  const { name, type, label, value, onChange, autoFocus } = props;
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
    </div>
  );
};

export default InputField;
