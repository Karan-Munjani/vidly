import React from "react";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Form from "./common/form";
const Joi = require("joi");

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = new Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),

    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  });

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Submitted");
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel = (movie) => {
    // console.log(_.get(movie, "genre.name"));

    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id, //_get was here
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
          {this.renderSelectInput("genreId", "Genre", this.state.genres)}
          {this.renderInputField("numberInStock", "Number In Stock")}
          {this.renderInputField("dailyRentalRate", "Rate", "text")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
