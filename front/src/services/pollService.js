// src/services/pollService.js
// Service pour gérer les requêtes liées aux sondages (polls)
import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:3000'; // À adapter selon l'URL de votre back

const pollService = {
  createPoll: async (data) => {
    const token = authService.getToken();
    const response = await axios.post(`${API_URL}/polls`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
  getPolls: async () => {
    const token = authService.getToken();
    const url = `${API_URL}/polls/all`;
    const response = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
  getPollById: async (id) => {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/polls/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
  votePoll: async (pollId, data) => {
    const token = authService.getToken();
    const response = await axios.post(`${API_URL}/polls/${pollId}/vote`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
  getPollResults: async (id) => {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/polls/${id}/results`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
  // Ajoutez d'autres méthodes si besoin (update, delete, etc.)
};

export default pollService;
