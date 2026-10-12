import axios from 'axios';
import {attachAuthInterceptor} from './authInterceptor.js';

const api = axios.create({
  baseURL: '/api', // proxied to the backend by vite.config.js in dev
});
attachAuthInterceptor(axios);

// ── Documents ──────────────────────────────────────────────
export const uploadDocument = (file, category) => {
  const formData = new FormData();
  formData.append('file', file);
  if (category) formData.append('category', category);
  return api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getDocuments = () => api.get('/documents');
export const getDocumentById = (id) => api.get(`/documents/${id}`);
export const deleteDocument = (id) => api.delete(`/documents/${id}`);

// ── Query / RAG ────────────────────────────────────────────
export const askQuestion = (question) => api.post('/query/ask', { question });
export const getQueryHistory = (limit = 50) => api.get(`/query/history?limit=${limit}`);

// ── Dashboard ──────────────────────────────────────────────
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getKnowledgeGaps = () => api.get('/dashboard/gaps');

export default api;
