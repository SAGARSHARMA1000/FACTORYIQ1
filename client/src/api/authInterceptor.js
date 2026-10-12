/**
 * Makes your existing axios instance send the login token, and sends the
 * user back to the demo login page when the token is rejected (401).
 *
 * WHERE TO ADD: new file, drop it in client/src/api/.
 *
 * WHERE TO CALL IT - in your existing client/src/api/client.js, right after
 * the axios instance is created:
 *   import { attachAuthInterceptor } from './authInterceptor.js';
 *   const api = axios.create({ baseURL: '/api' });
 *   attachAuthInterceptor(api);   // <-- add this line
 */
const STORAGE_KEY = 'factoryiq.auth'; // same key as context/AuthContext.jsx

export function attachAuthInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use((config) => {
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      // Offline demo sessions have a fake token, so do not send it
      if (session?.token && !session.offline) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    } catch {
      // ignore unreadable storage
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        if (!window.location.pathname.startsWith('/demo-login')) {
          window.location.assign('/demo-login');
        }
      }
      return Promise.reject(error);
    }
  );
}
