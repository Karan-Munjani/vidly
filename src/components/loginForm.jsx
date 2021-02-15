import React, { Component } from "react";
import InputField from "./common/inputField";
const Joi = require("joi");

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };
  username = React.createRef();
  //   Avoid using ref  for form data, but if you need to work with dom for use of animation library,3rd party dom libs then use it

  schema = new Joi.object({
    username: Joi.string().min(5).required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
  });

  validate = () => {
    const { error } = this.schema.validate(
      {
        username: this.state.account.username,
        password: this.state.account.password,
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

    // call to server and submit data if logged in then redirect movies page

    console.log("submitted");
  };

  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // console.log(errors);
    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors: errors || {} });
    // console.log(account);
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>LogIn</h1>
        <form onSubmit={this.handleSubmit}>
          <InputField
            name="username"
            type="text"
            label="Username"
            value={account.username}
            onChange={this.handleInputChange}
            autoFocus={true}
            error={errors.username}
          ></InputField>

          <InputField
            name="password"
            type="password"
            label="Password"
            value={account.password}
            onChange={this.handleInputChange}
            error={errors.password}
          ></InputField>

          <button disabled={this.validate()} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
