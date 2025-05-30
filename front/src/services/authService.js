import axios from 'axios';

const API_URL = 'http://localhost:3000'; // À adapter selon l'URL de votre back

const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    if (response.data && response.data.access_token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.access_token); // Utilise access_token
      }
    }
    return response.data;
  },
  register: async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
};

export default authService;
