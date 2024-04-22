import axios from "axios";

const BASE_URL = process.env.REACT_APP_BE_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "Application/json",
  },
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "Application/json",
  },
  withCredentials: true,
});

function path(root, subLink) {
  return `${root}${subLink}`;
}

const ROOT_PATH_USER = "/users";
const AUTH_API_URL = {
  login: path(ROOT_PATH_USER, "/login"),
  register: path(ROOT_PATH_USER, "/register"),
  refreshToken: path(ROOT_PATH_USER, "/refreshToken"),
  resetPassword: path(ROOT_PATH_USER, "/resetPassword"),
};

export { axiosPrivate, AUTH_API_URL };
