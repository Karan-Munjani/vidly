import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import Like from "./common/like";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class MoviesTable extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    pageSize: 4, //No of items to show on a page
    currentPage: 1,
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (moviesCount === 0) {
      return <h5 className="mt-3 mb-3">There Are No Movies In Database</h5>;
    }

    const movies = paginate(allMovies, currentPage, pageSize);
    // <> -> ReactFragment
    return (
      <div className="row">
        <div className="col-2 d-flex align-items-center">
          <ListGroup items={this.state.genres} />
        </div>
        <div className="col">
          <h5 className="mt-3 mb-3">
            Showing {moviesCount} Movies from Database
          </h5>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={moviesCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChnage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    // console.log("clicked", movie)
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChnage = (page) => {
    this.setState({ currentPage: page });
  };
}

export default MoviesTable;
