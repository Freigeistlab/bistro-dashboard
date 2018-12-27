import axios from "axios/index";

const API = axios.create({
  baseURL: "http://192.168.42.133:5000"
});

export default API;
