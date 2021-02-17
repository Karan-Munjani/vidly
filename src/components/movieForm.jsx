import React from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";
import _ from "lodash";
const Joi = require("joi");

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = new Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),

    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  });

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Submitted");
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres: genres });

    const movieId = this.props.match.params.id;
    // console.log(id);
    // console.log(movie);
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    // console.log(_.get(movie, "genre.name"));

    return {
      _id: movie._id,
      title: movie.title,
      genre: _.get(movie, "genre.name"),
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  render() {
    return (
      <div>
        {/* <h1>Movie Form {props.match.params.id}</h1> */}
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("title", "Title", "text", true)}
          {this.renderSelectInput("genre", "Genre", this.state.genres)}
          {this.renderInputField("numberInStock", "Number In Stock")}
          {this.renderInputField("dailyRentalRate", "Rate", "text")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
