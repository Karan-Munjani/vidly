import httpService from "./httpService";
import { apiURL } from "../config.json";

export function getMovies() {
  return httpService.get(`${apiURL}/movies`);
}
export function deleteMovie(movieId) {
  //
  return httpService.delete(`${apiURL}/movies/${movieId}`);
}

export function getMovie(movieId) {
  return httpService.get(`${apiURL}/movies/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(`${apiURL}/movies/${movie._id}`, body);
  }
  return httpService.post(apiURL + "/movies", movie);
}
