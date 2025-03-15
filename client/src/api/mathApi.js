import axios from 'axios';
// If using proxy in package.json, use relative path
const API_BASE_URL = '/api';

const mathApi = {
  // Perform addition operation
  // Perform addition operation
addition: async (num1, num2) => {
    try {
      // Make sure we're sending the numbers properly
      const payload = { 
        num1: parseFloat(num1), 
        num2: parseFloat(num2) 
      };
      const response = await axios.post(`${API_BASE_URL}/addition`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Addition API error:', error);
      throw error;
    }
  },

  // Calculate factorial
  factorial: async (number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/factorial/${number}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate Fibonacci sequence
  fibonacci: async (count) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fibonacci/${count}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get calculation history
  getCalculationHistory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/calculations`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific calculation by id
  getCalculation: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/calculations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default mathApi;