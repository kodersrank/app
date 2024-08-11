import axios from 'axios';

// load environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiService = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // interceptors
// apiService.interceptors.request.use(
//   config => {
//     // modify request config here, e.g., add auth tokens
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// apiService.interceptors.response.use(
//   response => {
//     // modify response data here
//     return response;
//   },
//   error => {
//     // handle response errors here
//     return Promise.reject(error);
//   }
// );

export default apiService;
