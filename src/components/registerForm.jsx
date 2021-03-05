import React from "react";
import { registerUser } from "../services/userService";
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

  doSubmit = async () => {
    // call to server and submit data if logged in then redirect movies page
    try {
      const user = this.state.data;
      const response = await registerUser(user);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
      console.log("submitted");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // toast.error("The User With Email-id Exists already");
        // toast.error(ex.response.data);
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
