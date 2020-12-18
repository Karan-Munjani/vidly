import React, { Component } from "react";
class ListGroup extends Component {
  state = {};
  render() {
    return (
      /*eslint-disable */
      <div class="list-group d-flex align-items-center">
        <a href="#" class="list-group-item list-group-item-action active">
          Active item
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          Item
        </a>
        <a href="#" class="list-group-item list-group-item-action ">
          Disabled item
        </a>
      </div>
      /*eslint-enable */
    );
  }
}

export default ListGroup;
