// UserChildManagement.jsx
import React, { useState } from 'react';
import { Layout, Card, Modal, Form } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import UserTable from './UserTable';
import ChildTable from './ChildTable';
import UserChildForm from './UserChildForm';
import Statistics from './UserInfo';

import { motion } from 'framer-motion';
const { Header, Content } = Layout;

const UserChildManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null); // 'user' or 'child'
  const [form] = Form.useForm();

  const handleAddUser = () => {
    form.resetFields();
    setCurrentEntity('user');
    setIsModalVisible(true);
  };

  const handleAddChild = () => {
    form.resetFields();
    setCurrentEntity('child');
    setIsModalVisible(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
  <motion.div
      initial={{ opacity: 0, y: -50 }} // El header comienza invisible y desplazado hacia arriba
      animate={{ opacity: 1, y: 0 }}   // Se desliza hacia abajo y se vuelve visible
      transition={{ duration: 0.6 }}   // Duración de la animación
    >
      <Header style={{ background: '#ff7875', padding: '0 30px' , borderRadius:'10px'}}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
          User & Child Management
        </h1>
      </Header>
    </motion.div>
  <Content style={{ padding: '20px' }}>
        <Statistics  /> {/* No hay usuarios o niños en este caso */}

    <Card title="User Management" style={{ marginTop: '20px' }} bordered={false}>
          <UserTable /> {/* Tabla estática */}
        </Card>

        <Card title="Child Management" style={{ marginTop: '20px' }} bordered={false}>
          <ChildTable /> {/* Tabla estática */}
        </Card>

        <Modal
          title={currentEntity === 'user' ? 'Add User' : 'Add Child'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          <UserChildForm
            form={form}
            isEditing={false} // No hay edición en este caso
            userOrChild={currentEntity}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default UserChildManagement;
