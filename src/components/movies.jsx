import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchField from "./common/searchField";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4, //No of items to show on a page
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres: genres,
    });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    else if(selectedGenre && selectedGenre._id){
      filtered = allMovies.filter(m=>m.genre._id===selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
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

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleAddMovie = () => {
    // console.log("Add clicked");
    // console.log(this.props);
    this.props.history.push("/movies/new");
  };

  handleSearchType = (query) => {
    console.log(" clicked");
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (moviesCount === 0) {
      return <h5>There Are No Movies In Database</h5>;
    }

    // <> -> ReactFragment
    return (
      <div className="row mt-3 mb-3">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <div className="row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleAddMovie}
            >
              Add Movie
            </button>
          </div>

          <div className="row mt-3">
            <SearchField
              value={searchQuery}
              onChange={this.handleSearchType}
              placeholder={"Search Movies...."}
            ></SearchField>
          </div>

          <div className="row mt-3 mb-3">
            <h5>Showing {totalCount} Movies from Database</h5>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn} //default column which is sorted
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChnage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
