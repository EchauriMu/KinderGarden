import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Row, Col, notification } from "antd";
import axiosInstance from "../../Api/AxiosInstance";
import { NumberOutlined, AppstoreAddOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddGroupModal = ({ isModalVisible, handleCancel }) => {
  const [tutors, setTutors] = useState([]); // Para almacenar los tutores disponibles
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Cargar tutores solo cuando el modal sea visible
    if (isModalVisible) {
      const fetchTutors = async () => {
        try {
          const response = await axiosInstance.get("/tutors/getbyinst");
          setTutors(response.data);
        } catch (error) {
          notification.error({
            message: "Error al cargar los tutores",
            description: "Hubo un problema al cargar la lista de tutores.",
          });
        }
      };

      fetchTutors();
    }
  }, [isModalVisible]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const groupIdentifier = `${values.grade}${values.groupLetter}`;
      await axiosInstance.post("institutes/create/group", {
        groupIdentifier,
        description: values.description,
        tutor: values.tutor,
      });

      notification.success({
        message: "Grupo añadido",
        description: `El grupo ${groupIdentifier} se ha añadido correctamente.`,
      });

      handleCancel(); // Cerrar el modal después de crear el grupo
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
              rules={[{ required: true, message: "Por favor selecciona la letra del grupo." }]}
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

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tutor"
              name="tutor"
              rules={[{ required: true, message: "Por favor selecciona un tutor." }]}
            >
              <Select
                placeholder="Selecciona un tutor"
                style={{ width: "100%" }}
                disabled={isLoading}
              >
                {tutors.map((tutor) => (
                  <Option value={tutor._id} key={tutor._id}>
                    {tutor.username}
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
