import React, { Component } from "react";
class ListGroup extends Component {
  state = {};

  render() {
    const { items } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => {
          return <li className="list-group-item">{item.name}</li>;
        })}
      </ul>
    );
  }
}

export default ListGroup;
