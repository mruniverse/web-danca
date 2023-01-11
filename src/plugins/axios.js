const axios = require("axios").default;

const api = axios.create({
  baseURL: "http://new.webdanca.com:8084/v1/",
});

export default api;
