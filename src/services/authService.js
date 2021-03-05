import httpService from "./httpService";
import { apiURL } from "../config.json";

export function login(email, password) {
  return httpService.post(`${apiURL}/auth`, { email, password });
}
