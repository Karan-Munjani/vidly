import React, { Component } from "react";
class LoginForm extends Component {
  render() {
    return (
      <div>
        <h1>LogIn</h1>
        <form>
          <div className="form-group">
            <label htmlFor="e-mail">Email</label>
            <input
              type="text"
              name="e-mail"
              id="e-mail"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="passsword"
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
