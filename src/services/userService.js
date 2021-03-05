import httpService from "./httpService";
import { apiURL } from "../config.json";

export function registerUser(user) {
  return httpService.post(apiURL + "/users", user);
}
