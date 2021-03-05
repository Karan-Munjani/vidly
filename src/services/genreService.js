import httpService from "./httpService";
import { apiURL } from "../config.json";

export function getGenres() {
  return httpService.get(`${apiURL}/genres`);
}
