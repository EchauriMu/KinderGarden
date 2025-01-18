import React, { useState } from 'react';
import { Form, Input, Button, notification, Layout, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const { username, password } = values;
      const response = await axios.post(
        'http://localhost:80/api/v1/auth/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        notification.success({
          message: 'Inicio de sesión exitoso',
          description: 'Bienvenido de nuevo.',
        });

        // Actualizamos el estado de autenticación
        await onLogin(true);

        // Navegamos a la ruta que el usuario intentaba acceder o al dashboard por defecto
        navigate(from, { replace: true });
      } else {
        throw new Error(response.data.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      notification.error({
        message: 'Error al iniciar sesión',
        description: error.message || 'Hubo un problema al procesar tu solicitud.',
      });
      onLogin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Formas decorativas que cubren toda la pantalla */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', top: 0, width: '100%', height: '25%', backgroundColor: '#059669' }} />
        <div
          style={{
            position: 'absolute',
            top: '25%',
            width: '100%',
            height: '25%',
            backgroundColor: '#fca5a5',
          }}
        />
        <div style={{ position: 'absolute', top: '50%', width: '100%', height: '25%', backgroundColor: '#ca8a04' }} />
        <div
          style={{
            position: 'absolute',
            top: '75%',
            width: '100%',
            height: '25%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1, height: '100%', backgroundColor: '#ffe58f', transform: 'skewX(-12deg)' }} />
          <div style={{ flex: 1, height: '100%', backgroundColor: '#ff7875' }} />
          <div style={{ flex: 1, height: '100%', backgroundColor: '#ffa940', transform: 'skewX(12deg)' }} />
        </div>
      </div>

      {/* Contenido principal */}
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <div style={{ width: 400, padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' ,alignContent:'center'}}>
          {/* Logo y Nombre */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position:'relative', top:'4px'}}>
      
          <img
              src="https://itt0resources.blob.core.windows.net/kindertrack/Picsart_24-12-24_21-51-55-239.jpg"
              alt="KinderGarden Logo"
              style={{ height: 72, marginRight: 0 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
      
            <Text
              style={{
                color: '#1890ff',
                fontSize: '24px',
                fontWeight: 'bold',
                top:'10px',
                zIndex:'10'
              }}
            >
              KinderGarden
            </Text>
          </div>

          {/* Título del formulario */}
          <Title level={2} style={{ textAlign: 'center', color: '#52c41a', marginBottom: 24 }}>
            Iniciar Sesión
          </Title>

          <Form name="loginForm" onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label={<Text strong>Nombre de usuario</Text>}
              name="username"
              rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario.' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" size="large" />
            </Form.Item>

            <Form.Item
              label={<Text strong>Contraseña</Text>}
              name="password"
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña.' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                Iniciar Sesión
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Text>
                ¿No tienes cuenta?{' '}
                <Link to="/register" style={{ color: '#1890ff' }}>
                  Regístrate
                </Link>
              </Text>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
