// ActionButtons.jsx
import React from 'react';
import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const ActionButtons = ({ handleAddUser, handleAddChild }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
      {/* Botón para agregar usuario */}
      <Col xs={24} sm={12} md={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}  // Aparece desde abajo con suavidad
          animate={{ opacity: 1, y: 0 }}   // Desaparece el desplazamiento y se hace visible
          transition={{ duration: 0.6 }}    // Transición suave
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddUser}
            style={{ width: '100%' }}
          >
            Add User
          </Button>
        </motion.div>
      </Col>

      {/* Botón para agregar niño */}
      <Col xs={24} sm={12} md={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}  // Aparece desde abajo con suavidad
          animate={{ opacity: 1, y: 0 }}   // Desaparece el desplazamiento y se hace visible
          transition={{ duration: 0.6, delay: 0.2 }}  // Con retraso sutil
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddChild}
            style={{ width: '100%' }}
          >
            Add Child
          </Button>
        </motion.div>
      </Col>
    </Row>
  );
};

export default ActionButtons;
