import httpService from "./httpService";
import config from "../config.json";

export function registerUser(user) {
    return httpService.post(config.apiEndPoint + "/users", user);
}