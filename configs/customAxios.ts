import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export default customAxios;
