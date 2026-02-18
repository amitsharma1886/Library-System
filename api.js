import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000" // ✅ tumhara server yahi chal raha hai
});

export default api;
