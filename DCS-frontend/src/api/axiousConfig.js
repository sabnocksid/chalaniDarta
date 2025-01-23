import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/api/v1'
    : 'http://52.66.247.124:2020/api/v1/';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
