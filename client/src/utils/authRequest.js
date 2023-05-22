import axios from 'axios';

import store from '../redux/store';

const authRequest = axios.create({
  baseURL: '',
});

authRequest.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default authRequest;
