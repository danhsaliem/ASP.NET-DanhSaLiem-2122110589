// src/Service/Api.js
import axios from "axios";

const Api = axios.create({
  baseURL:"http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // ⏱️ Tăng timeout lên 30 giây
});

export default Api;
