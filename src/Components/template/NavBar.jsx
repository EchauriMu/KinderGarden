import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Drawer, Typography } from 'antd';
import { 
  MenuOutlined, 
  UserOutlined, 
  DashboardOutlined,
  LoginOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  BankOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ onSelectMenuItem }) => {
  const [visible, setVisible] = useState(false); // Controla la visibilidad del Drawer
  const [selectedKey, setSelectedKey] = useState('dashboard'); // Controla la opción seleccionada
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950); // Responsividad basada en 950px

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 950);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Opciones del menú
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'attendance',
      icon: <LoginOutlined />,
      label: 'Entradas y Salidas',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'Gestión de Usuarios',
    },
    {
      key: 'institute',
      icon: <BankOutlined />,
      label: 'Instituto',
    },
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reportes',
    },

  ];

  const userMenu = {
    items: [
      {
        key: '1',
        icon: <UserOutlined />,
        label: 'Perfil',
      },
      {
        key: '2',
        icon: <LoginOutlined />,
        label: 'Cerrar Sesión',
      },
    ],
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Actualiza el estado de la opción seleccionada
    onSelectMenuItem(e.key); // Notifica al componente principal
  };

  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        {/* Contenido Izquierdo */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <img
            src="https://itt0resources.blob.core.windows.net/kindertrack/Picsart_24-12-24_21-51-55-239.jpg"
            alt="KinderGarden Logo"
            style={{ height: 62, marginRight: 12 }}
          />
        <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        <span className="text-red-500">k</span>
        <span className="text-yellow-500">i</span>
        <span className="text-blue-500">n</span>
        <span className="text-green-500">d</span>
        <span className="text-purple-500">e</span>
        <span className="text-orange-500">r</span>
        <span className="text-pink-500">g</span>
        <span className="text-teal-500">a</span>
        <span className="text-indigo-500">r</span>
        <span className="text-amber-500">d</span>
        <span className="text-emerald-500">e</span>
        <span className="text-cyan-500">n</span>
      </h1>
    </div>
        </div>

        {/* Contenido Derecho */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Menú en Desktop */}
          {!isMobile && (
            <Menu
              mode="horizontal"
              items={menuItems}
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              style={{ border: 'none' }}
            />
          )}

          {/* Controles de Usuario y Botón de Menú */}
          <Space>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
              />
            )}
            <Dropdown menu={userMenu} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />}>
                {!isMobile ? 'Usuario' : null}
              </Button>
            </Dropdown>
          </Space>
        </div>
      </div>

      {/* Menú en Mobile */}
      <Drawer
        title="Menú"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
        width={250}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={(e) => {
            setVisible(false);
            handleMenuClick(e);
          }}
          style={{ border: 'none' }}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
