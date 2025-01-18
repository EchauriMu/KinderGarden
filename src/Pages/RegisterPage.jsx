import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

// Validación para el número de teléfono mexicano
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(?:\+52)?(?:1)?\d{10}$/;
  return phoneRegex.test(phone);
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const { username, email, phone, password } = values;

      if (!validatePhoneNumber(phone)) {
        notification.error({
          message: 'Número de teléfono inválido',
          description: 'El número debe ser válido en México.',
        });
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:80/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Registro exitoso',
          description: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
        });
        navigate('/login');
      } else {
        throw new Error(data.message || 'Hubo un problema al registrar tu cuenta.');
      }
    } catch (error) {
      notification.error({
        message: 'Error en el registro',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 relative">
      {/* Formas decorativas */}
      <div className="absolute top-0 left-0 w-full h-32 bg-emerald-600 z-0"></div>
      <div className="absolute top-32 left-0 w-full h-32 bg-red-300 transform -skew-x-12 z-0"></div>
      <div className="absolute top-64 left-0 w-full overflow-hidden z-0">
        <div className="relative h-32">
          <div className="absolute w-1/3 h-32 bg-yellow-300 transform -skew-x-12"></div>
          <div className="absolute left-1/3 w-1/3 h-32 bg-red-400"></div>
          <div className="absolute right-0 w-1/3 h-32 bg-orange-400 transform skew-x-12"></div>
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-80 z-10">
        <h2 className="text-center text-2xl font-bold text-emerald-600 mb-6">Registrar Cuenta</h2>

        <Form name="registerForm" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario.' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre de usuario"
              className="border border-emerald-600 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Por favor ingresa un correo válido.' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo electrónico"
              className="border border-emerald-600 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Por favor ingresa tu número de teléfono.' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Teléfono"
              className="border border-emerald-600 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña.' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              className="border border-emerald-600 rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700"
              loading={loading}
            >
              Registrar Cuenta
            </Button>
          </Form.Item>

          <Form.Item className="text-center">
            <Link to="/login" className="text-blue-500">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
