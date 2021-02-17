import React from "react";
import Form from "./common/form";

const Joi = require("joi");

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = new Joi.object({
    username: Joi.string().min(5).required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
  });

  doSubmit = () => {
    // call to server and submit data if logged in then redirect movies page

    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>LogIn</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("username", "Username", "text", true)}
          {this.renderInputField("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
