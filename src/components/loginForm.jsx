import React, { Component } from "react";
import InputField from "./common/inputField";
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

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "") {
      errors.username = "UserName is required";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
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

  handleInput = (e) => {
    // console.log(e.currentTarget.value);
    const account = { ...this.state.account };
    // console.log(account);
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
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
