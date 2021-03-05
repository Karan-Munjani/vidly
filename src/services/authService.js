import httpService from "./httpService";
import { apiEndPoint } from "../config.json";

export function login(email, password) {
  return httpService.post(`${apiEndPoint}/auth`, { email, password });
}
