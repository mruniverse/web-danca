const axios = require('axios').default;

const api = axios.create({
    baseURL: 'http://new.webdanca.com:8088/webdanca/v1/'
  });

export default api;