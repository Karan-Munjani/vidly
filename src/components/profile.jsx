import React, { Component } from "react";
class Profile extends Component {
  state = {
    user: "",
  };

  componentDidMount() {
    const user = this.props.location.user;
    this.setState({ user });
  }
  render() {
    return <h1>Hello</h1>;
  }
}

export default Profile;
