import InputField from "./inputField";
import { Component } from "react";
const Joi = require("joi");

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { error } = this.schema.validate(
      {
        username: this.state.data.username,
        password: this.state.data.password,
      },
      { abortEarly: false }
    );

    if (!error) return null;
    const errors = {};
    error.details.map((err) => {
      return (errors[err.path[0]] = err.message);
    });
    console.log(error);

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = new Joi.object({
      [name]: this.schema.extract(name),
    });
    const { error } = schema.validate(obj);

    if (error) return error.details[0].message;
    else return null;
    // return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }
    this.dosubmit();
  };

  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // console.log(errors);
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors: errors || {} });
    // console.log(data);
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInputField(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <InputField
        name={name}
        type={type}
        label={label}
        value={data[name]}
        onChange={this.handleInputChange}
        autoFocus={true}
        error={errors[name]}
      ></InputField>
    );
  }
}

export default Form;
