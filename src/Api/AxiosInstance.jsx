import axios from 'axios';
import Cookies from 'js-cookie';  // Importamos js-cookie para obtener el token desde las cookies

// Crear una instancia de axios con un timeout de 30 segundos
const axiosInstance = axios.create({
  baseURL: 'http://localhost:80/api/v1',  // Tu base URL de la API
  timeout: 30000 , // 30 segundos
  withCredentials: true
});

// Configurar un interceptor para agregar el token a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token JWT de la cookie
    const token = Cookies.get('jwtToken');

    if (token) {
      // Si hay un token, lo agregamos a la cabecera Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Manejo de errores
    return Promise.reject(error);
  }
);

// Exportación por defecto
export default axiosInstance;
