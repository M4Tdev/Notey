import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3030/api',
  headers: {
    Authorization: 'noteyapp',
  },
});
