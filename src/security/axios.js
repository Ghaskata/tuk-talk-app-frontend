import axios from "axios";

const BASE_URL = process.env.REACT_APP_BE_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "Application/json",
  },
  // withCredentials: true,  // means that  it indicates that you want to send cookies along with your request.
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "Application/json",
  },
  // withCredentials: true,
});

function path(root, subLink) {
  return `${root}${subLink}`;
}

const ROOT_PATH_USER = "/users";

const UPLOAD_IMAGE = "/uploadImage/:type";

const AUTH_API_URL = {
  login: path(ROOT_PATH_USER, "/login"),
  register: path(ROOT_PATH_USER, "/register"),
  refreshToken: path(ROOT_PATH_USER, "/refreshToken"),
  resetPassword: path(ROOT_PATH_USER, "/resetPassword"),
  socialLogin: path(ROOT_PATH_USER, "/socialLogin"),
};

const MY_PROFILE_API_URL = {
  profile: path(ROOT_PATH_USER, "/profile"),
  updateProfile: path(ROOT_PATH_USER, "/updateProfile"),
};

export { axiosPrivate, AUTH_API_URL, MY_PROFILE_API_URL, UPLOAD_IMAGE };
