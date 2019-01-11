import axios from "axios/index";
import {apiURI} from "../constants/constants";

const API = axios.create({
  baseURL: apiURI
});

export default API;
