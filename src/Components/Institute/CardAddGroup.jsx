import React, { useState } from "react";
import { Card, Typography, Modal, Input, Form, notification, Row, Col, Select,Button } from "antd";
import { motion } from "framer-motion";
import { NumberOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import axiosInstance from "../../Api/AxiosInstance";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CardAddGroup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    if (!isLoading) {
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const groupIdentifier = `${values.grade}${values.groupLetter}`;
      await axiosInstance.post(`institutes/create/group`, {
        groupIdentifier,
        description: values.description,
      });

      notification.success({
        message: "Grupo añadido",
        description: `El grupo ${groupIdentifier} se ha añadido correctamente.`,
      });

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Hubo un problema al añadir el grupo. Inténtalo nuevamente.";
      notification.error({
        message: "Error al añadir el grupo",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            backgroundColor: "#f9f9f9",
          }}
          hoverable
        >
          <AppstoreAddOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
          <Title level={4} style={{ color: "#1890ff", marginTop: "10px" }}>
            Añadir Grupo
          </Title>
          <Paragraph style={{ color: "#555" }}>
            Crea y organiza nuevos grupos para el instituto de manera eficiente.
          </Paragraph>
        </Card>
      </motion.div>

      <Modal
        title="Añadir Grupo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
        closable={!isLoading}
        maskClosable={!isLoading}
        centered
        style={{
          borderRadius: "10px",
        }}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Grado"
                name="grade"
                rules={[{ required: true, message: "Por favor ingresa el grado." }]}
              >
                <Input
                  type="number"
                  placeholder="Ejemplo: 5"
                  min={1}
                  max={12}
                  prefix={<NumberOutlined style={{ color: "#1890ff" }} />}
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Identificador"
                name="groupLetter"
                rules={[
                  { required: true, message: "Por favor selecciona la letra del grupo." },
                ]}
              >
                <Select
                  placeholder="Selecciona la letra"
                  style={{ width: "100%" }}
                  suffixIcon={<AppstoreAddOutlined style={{ color: "#1890ff" }} />}
                  disabled={isLoading}
                >
                  {["A", "B", "C", "D"].map((letter) => (
                    <Option value={letter} key={letter}>
                      {letter}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Descripción" name="description">
            <Input.TextArea
              placeholder="Descripción opcional"
              rows={4}
              style={{
                borderRadius: "8px",
                padding: "10px",
              }}
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
                style={{
                  backgroundColor: "#1890ff",
                  borderRadius: "5px",
                  borderColor: "#1890ff",
                  color: "#fff",
                }}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardAddGroup;
