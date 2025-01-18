import React from "react";
import { Card, Button, Typography } from "antd";
import { motion } from "framer-motion";
import { UserAddOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const CardTutors = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
      <Card
        actions={[
          <Button type="primary" icon={<UserAddOutlined />} block>
            Asignar Tutores
          </Button>,
        ]}
      >
        <UserAddOutlined style={{ fontSize: "64px", color: "#fa8c16", marginBottom: "10px" }} />
        <Title level={4}>Tutores</Title>
        <Paragraph>Asigna tutores a los grupos para gestionar mejor a los estudiantes.</Paragraph>
      </Card>
    </motion.div>
  );
};

export default CardTutors;

