import React, { Component } from "react";
class SearchField extends Component {
  state = {};

  render() {
    const { onChange, value, placeholder } = this.props;
    return (
      <input
        type="search"
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
        className="form-control ds-input"
        id="search-input"
        placeholder={placeholder}
      ></input>
    );
  }
}

export default SearchField;
