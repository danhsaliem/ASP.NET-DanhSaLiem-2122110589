// src/Service/Api.js
import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
