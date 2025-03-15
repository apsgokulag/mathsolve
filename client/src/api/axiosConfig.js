import axios from 'axios';

// Create an instance of axios with custom configuration
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds
  maxContentLength: 5 * 1024 * 1024, // 5MB
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;