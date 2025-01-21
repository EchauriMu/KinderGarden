import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // Simulamos una llamada a una API para obtener los datos
    const fetchData = async () => {
      const fetchedUsers = await new Promise((resolve) =>
        setTimeout(() => resolve(["User1", "User2", "User3"]), 1000)
      );
      const fetchedChildren = await new Promise((resolve) =>
        setTimeout(() => resolve(["Child1", "Child2"]), 1000)
      );

      setUsers(fetchedUsers);
      setChildren(fetchedChildren);
    };

    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Total Users Card */}
      <Col xs={24} sm={6} md={6} lg={6}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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

      {/* Total Children Card */}
      <Col xs={24} sm={6} md={6} lg={6}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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

      {/* Add User Card */}
      <Col xs={24} sm={6} md={6} lg={6}>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card
            style={{
              borderRadius: '10px',
            transition: 'all 0.3s ease',
              textAlign: 'center',
            }}
          >
            <UserAddOutlined style={{ fontSize: '48px', color: '#fa8c16', marginBottom: '8px' }} />
            <Title style={{ color: '#fa8c16', fontSize: '16px' }} level={5}>
              Añadir Usuario
            </Title>
            <Paragraph style={{ fontSize: '12px' }}>Agrega nuevos usuarios para la plataforma de manera rápida.</Paragraph>
          </Card>
        </motion.div>
      </Col>

      {/* Add Child Card */}
      <Col xs={24} sm={6} md={6} lg={6}>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card
            style={{
              borderRadius: '10px',
             transition: 'all 0.3s ease',
              textAlign: 'center',
            }}
          >
            <UserAddOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '8px' }} />
            <Title style={{ color: '#1890ff', fontSize: '16px' }} level={5}>
              Añadir Niño
            </Title>
            <Paragraph style={{ fontSize: '12px' }}>Agrega nuevos niños para el instituto de manera eficiente.</Paragraph>
          </Card>
        </motion.div>
      </Col>
    </Row>
  );
};

export default Statistics;
