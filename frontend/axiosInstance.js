import axios from "axios";

const bookBaseUrl = axios.create({
  baseURL: "http://localhost:3000/book",
});

export default bookBaseUrl;
