import { createRoot } from 'react-dom/client';
import { ConfigProvider, App as AntdApp } from 'antd'; // Importar `App` para manejar el contexto
import esES from 'antd/es/locale/es_ES'; // Configuración de idioma español
import './index.css';
import App from './App.jsx';

// Definimos un tema personalizado para Ant Design
const theme = {
  token: {
    colorPrimary: '#4CAF50', // Color primario (verde)
    colorSucces: '#1677ff',
  },
};

// Renderizamos la aplicación con ConfigProvider y AntdApp
createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={esES} theme={theme}>
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>
);
