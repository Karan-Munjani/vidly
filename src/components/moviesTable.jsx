import React, { Component } from "react";
import Like from "./common/like";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      // below we pass movie which will be passed to function as item variable from renderCell in tableBody Component
      content: (movie) => {
        return (
          <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        );
      },
    },
    {
      key: "delete",
      content: (movie) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
