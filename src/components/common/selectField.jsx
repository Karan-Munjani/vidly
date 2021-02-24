import React from "react";
const SelectField = ({ name, label, error, options, ...args }) => {
  return (
    <div className="form-group">
      {/* {console.log(value)} */}
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...args}>
        <option value=""></option>
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectField;
