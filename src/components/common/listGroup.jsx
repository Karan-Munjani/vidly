import React, { Component } from "react";
class ListGroup extends Component {
  state = {};

  render() {
    const { items, textProperty, valueProperty } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => {
          return (
            <li key={item[valueProperty]} className="list-group-item">
              {item[textProperty]}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListGroup;
