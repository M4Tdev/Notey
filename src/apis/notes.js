import axios from 'axios';

export default axios.create({
  baseURL: 'https://notey-backend.herokuapp.com/api',
  headers: {
    Authorization: 'noteyapp',
  },
});
