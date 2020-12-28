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
    username: Joi.string().min(5).required(),
    password: Joi.string().min(8).required(),
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
    console.log(error.details);

    return errors;
  };

  validateProperty = (input) => {
    if (input.name === "username") {
      if (input.value.trim() === "") {
        return "username is required";
      }
    }

    if (input.name === "password") {
      if (input.value.trim() === "") {
        return "password is required";
      }
    }
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
    // const userName = this.username.current.value;
    // console.log(userName);

    console.log("submitted");
  };

  handleInput = async (e) => {
    const { currentTarget: input } = e;
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });

    const errors = await this.validate();
    this.setState({ errors: errors || {} });
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
            onChange={this.handleInput}
            autoFocus={true}
            error={errors.username}
          ></InputField>

          <InputField
            name="password"
            type="password"
            label="Password"
            value={account.password}
            onChange={this.handleInput}
            error={errors.password}
          ></InputField>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
