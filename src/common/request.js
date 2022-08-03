import { create } from 'axios';

const api = create({
  timeout: 2000,
});
api.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error),
);


api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default api;
