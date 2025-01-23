import { notification } from 'antd';

// Configuración predeterminada para las notificaciones
const notificationConfig = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: 'bottomRight', // Ubicación en la parte inferior derecha
    duration: 3, // Duración en segundos
  });
};

export default notificationConfig;
