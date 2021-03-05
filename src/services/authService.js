import httpService from "./httpService";
import jwt_decode from "jwt-decode";

import { apiURL } from "../config.json";

const tokenKey = "token";

httpService.setJWT(getJWT());

export async function login(email, password) {
  const { data: jwt } = await httpService.post(`${apiURL}/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwt_decode(token);
  } catch (ex) {
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJWT,
};
