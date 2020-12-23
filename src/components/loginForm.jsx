import React, { Component } from "react";
class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
  };
  username = React.createRef();
  //   Avoid using ref  for form data, but if you need to work with dom for use of animation library,3rd party dom libs then use it

  handleSubmit = (e) => {
    e.preventDefault();

    // call to server and submit data if logged in then redirect movies page
    // const userName = this.username.current.value;
    // console.log(userName);

    console.log("submitted");
  };

  handleInput = (e) => {
    console.log(e.currentTarget.value);
    const account = { ...this.state.account };
    console.log(account);
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>LogIn</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="username"
              value={account.username}
              onChange={this.handleInput}
              id="username"
              autoFocus
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={account.password}
              onChange={this.handleInput}
              name="password"
              id="password"
              className="form-control"
            />
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
