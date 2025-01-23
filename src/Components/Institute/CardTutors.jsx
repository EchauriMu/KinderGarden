// CardTutors.jsx
import React, { useState } from "react";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";
import { UserAddOutlined } from "@ant-design/icons";
import ModalTutor from "./AddTutorModal";

const { Title, Paragraph } = Typography;

const CardTutors = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={showModal}
        >
          <UserAddOutlined
            style={{ fontSize: "64px", color: "#fa8c16", marginBottom: "10px" }}
          />
          <Title style={{ color: "#fa8c16" }} level={4}>
            Tutores
          </Title>
          <Paragraph>Agrega nuevos tutores para el instituto de manera rápida.</Paragraph>
        </Card>
      </motion.div>

      {isModalVisible && <ModalTutor visible={isModalVisible} onCancel={handleCancel} />}
    </>
  );
};

export default CardTutors;