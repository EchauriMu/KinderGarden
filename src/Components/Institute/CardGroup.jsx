import React from "react";
import { Card, Button, Typography } from "antd";
import { motion } from "framer-motion";
import { TeamOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const CardGroup = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
      <Card
        actions={[
          <Button type="primary" icon={<TeamOutlined />} block>
            Ver Grupos
          </Button>,
        ]}
      >
        <TeamOutlined style={{ fontSize: "64px", color: "#1890ff", marginBottom: "10px" }} />
        <Title level={4}>Grupos</Title>
        <Paragraph>Administra los grupos y visualiza los detalles del instituto.</Paragraph>
      </Card>
    </motion.div>
  );
};

export default CardGroup;
