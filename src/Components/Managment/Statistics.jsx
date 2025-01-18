// Statistics.jsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion'; // Importamos framer-motion

const Statistics = ({ users, children }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Estado inicial de la animación
          animate={{ opacity: 1, y: 0 }}  // Estado final de la animación
          transition={{ duration: 0.8 }}   // Duración de la animación
        >
          <Card>
            <Statistic
              title="Total Users"
              value={users.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </motion.div>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Estado inicial de la animación
          animate={{ opacity: 1, y: 0 }}  // Estado final de la animación
          transition={{ duration: 0.8, delay: 0.2 }}  // Duración y retraso de la animación
        >
          <Card>
            <Statistic
              title="Total Children"
              value={children.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </motion.div>
      </Col>
    </Row>
  );
};

export default Statistics;
