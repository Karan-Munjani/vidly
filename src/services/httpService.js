import { toast } from "react-toastify";
const axios = require("axios");

// axios.interceptor.request
// axios.interceptors.response.use(success,error)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.error("logging the Error".toUpperCase(), error);
    toast.error("An unexpected Error occurred");
  }
  // To pass control to the catch Block we will use rejected Promise
  return Promise.reject(error);
});

export function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,
};
