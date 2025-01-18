import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import LandingPage from './Pages/LandingPage';
import Template from './Pages/TemplatePage';
import useAuth from './UseAuth';
import { Spin } from 'antd';

function App() {
  const { isAuthenticated, loading, updateAuthStatus } = useAuth();

  if (loading) {
    // Mostramos la imagen y el spinner mientras verificamos la autenticación
    return (
      <div className="flex justify-center  min-h-screen flex-col">
        {/* Imagen arriba del spinner */}
        <div className="flex justify-center items-center">
        <img
          src="https://itt0resources.blob.core.windows.net/kindertrack/Picsart_24-12-24_21-51-55-239.jpg"
          alt="KinderGarden Logo"
          style={{ width: '150px', marginBottom: '40px' }}
        /></div>
        {/* Spinner debajo de la imagen */}
        <Spin size="large" tip="Cargando...">
          {/* Contenido hijo vacío */}
          <div></div>
        </Spin>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Template /> : <LandingPage />} 
        />
        
        {/* Ruta login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <LoginPage onLogin={updateAuthStatus} />
          } 
        />
        
        {/* Ruta registro */}
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <RegisterPage />
          } 
        />
        
        {/* Ruta dashboard protegida */}
        <Route 
          path="/dashboard/*" 
          element={
            isAuthenticated ? 
            <Template /> : 
            <Navigate to="/login" state={{ from: '/dashboard' }} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;