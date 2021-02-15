import React from "react";
const InputField = (props) => {
  const { name, label, error, ...args } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...args} name={name} id={name} className="form-control" />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputField;
