import React from "react";
import Form from "./common/form";
const Joi = require("joi");
class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = new Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("E-mail"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().min(3).required().label("Name"),
  });

  doSubmit = () => {
    // call to server and submit data if logged in then redirect movies page

    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Register Here</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("email", "E-mail", "text", true)}
          {this.renderInputField("password", "Password", "password")}
          {this.renderInputField("name", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
