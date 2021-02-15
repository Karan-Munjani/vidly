import React from "react";
import Form from "./common/form";
import InputField from "./common/inputField";

const Joi = require("joi");

class LoginForm extends Form {
  state = {
    data: {
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

 
  dosubmit = () => {
    // call to server and submit data if logged in then redirect movies page

    console.log("submitted");
  };

 
  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>LogIn</h1>
        <form onSubmit={this.handleSubmit}>
          <InputField
            name="username"
            type="text"
            label="Username"
            value={data.username}
            onChange={this.handleInputChange}
            autoFocus={true}
            error={errors.username}
          ></InputField>

          <InputField
            name="password"
            type="password"
            label="Password"
            value={data.password}
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
