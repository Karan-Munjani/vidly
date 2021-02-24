import httpService from "./httpService";
import config from "../config.json";

export function getMovies() {
  return httpService.get(`${config.apiEndPoint}/movies`);
}
export function deleteMovie(movieId) {
  //
  return httpService.delete(`${config.apiEndPoint}/movies/${movieId}`);
}

export function getMovie(movieId) {
  return httpService.get(`${config.apiEndPoint}/movies/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(`${config.apiEndPoint}/movies/${movie._id}`, body);
  }
  return httpService.post(config.apiEndPoint + "/movies", movie);
}
