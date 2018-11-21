import axios from "axios/index";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export default API;