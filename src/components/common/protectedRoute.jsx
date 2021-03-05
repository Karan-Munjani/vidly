import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

class ProtectedRoute extends Component {
  state = {};
  render() {
    const {
      path,
      component: Component,
      render,
      redirect,
      ...rest
    } = this.props;
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          if (!auth.getCurrentUser())
            return <Redirect to={redirect}></Redirect>;
          return Component ? <Component {...props}></Component> : render(props);
        }}
      ></Route>
    );
  }
}

export default ProtectedRoute;
