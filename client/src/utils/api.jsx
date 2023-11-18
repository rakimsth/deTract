import axios from "axios";
import { BASE_URL } from "../constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

// Access-token if required
instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
)
  ? `Bearer ${localStorage.getItem("access_token")}`
  : null;

export default instance;
