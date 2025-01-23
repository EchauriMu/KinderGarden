import React from "react";
import { motion } from "framer-motion";
import InstituteInfo from "./InstituteInfo";
import CardGroup from "./GroupsList/CardGroup";
import CardAddGroup from "./CardAddGroup";
import CardTutors from "./CardTutors";
import { Layout, Row, Col, Card, Button, Typography, Statistic } from "antd";
import { TeamOutlined, PlusOutlined, UserAddOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const InstituteDashboard = () => {

  // Animación para el Header (deslizar de izquierda a derecha, suave y rápida)
  const headerAnimation = {
    initial: { opacity: 0, x: "-100%" }, // Empieza fuera de la pantalla, hacia la izquierda
    animate: { opacity: 1, x: 0 }, // Se desliza hacia su posición original
    transition: { 
      duration: 0.8, // Aumentamos la duración para que se vea más suave
      ease: [0.25, 0.8, 0.25, 1] // Usamos una curva de Bézier para una aceleración suave
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header con animación de deslizamiento */}
      <motion.div {...headerAnimation}>
        <Header style={{ background: '#ffa940', padding: '0 30px' , borderRadius:'10px'}}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '2rem' , fontWeight:'800' }}>
          Instituto
        </h1>
        </Header>
      </motion.div>

      {/* Content */}
      <Content style={{ padding: "20px" }}>
        {/* Información del Instituto */}
        <InstituteInfo  />

        {/* Tarjetas de Gestión */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} lg={16}>
            <CardGroup />
          </Col>
          <Col xs={24} sm={6} lg={4}>
            <CardAddGroup />
          </Col>
          <Col xs={24} sm={6} lg={4}>
            <CardTutors />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default InstituteDashboard;
