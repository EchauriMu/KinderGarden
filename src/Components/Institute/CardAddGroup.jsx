import React, { useState } from "react";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";
import { AppstoreAddOutlined } from "@ant-design/icons";
import AddGroupModal from "./AddGroupModal"; // Importamos el componente de modal

const { Title, Paragraph } = Typography;

const CardAddGroup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={showModal}
        style={{ cursor: "pointer" }}
      >
        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            textAlign: "center",
          }}
          hoverable
        >
          <AppstoreAddOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
          <Title level={4} style={{ color: "#1890ff", marginTop: "10px" }}>
            Añadir Grupo
          </Title>
          <Paragraph style={{ color: "#555" }}>
            Crea nuevos grupos para el instituto de manera eficiente.
          </Paragraph>
        </Card>
      </motion.div>

      <AddGroupModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default CardAddGroup;
