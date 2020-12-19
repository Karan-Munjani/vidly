import React, { Component } from "react";
class ListGroup extends Component {
  state = {};

  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onItemSelect,
      selectedItem,
    } = this.props;
    return (
      <div className="list-group">
        {items.map((item) => {
          return (
            <a
              href="#"
              className={
                item === selectedItem
                  ? "list-group-item list-group-item-action active"
                  : "list-group-item list-group-item-action"
              }
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
            >
              {item[textProperty]}
            </a>
          );
        })}
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
