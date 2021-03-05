import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (!user) {
      this.setState({ hidden: true });
    }
  }

  render() {
    const columns = [
      {
        path: "title",
        label: "Title",
        content: (movie) => {
          return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
        },
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        // below we pass movie which will be passed to function as item variable from renderCell in tableBody Component
        content: (movie) => {
          return (
            <Like
              liked={movie.liked}
              onClick={() => this.props.onLike(movie)}
            />
          );
        },
      },
      {
        key: "delete",
        hidden: this.state.hidden,
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

    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
        columns={columns}
      />
    );
  }
}

export default MoviesTable;
