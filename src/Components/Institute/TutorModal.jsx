import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Select, Button, Typography, Spin, Alert, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axiosInstance from "../../Api/AxiosInstance";

const { Title } = Typography;
const { Option } = Select;

const ModalTutor = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users/get/active");

      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        throw new Error("La respuesta no contiene usuarios válidos");
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      message.error("Error al cargar los usuarios. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      fetchUsers();
    }
    return () => {
      if (!visible) {
        form.resetFields();
        setSelectedUser(null);
        setShowAlert(false);
        setUsers([]);
      }
    };
  }, [visible, fetchUsers, form]);

  const handleUserChange = (value) => {
    setSelectedUser(value);
    form.setFieldsValue({ userId: value });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Datos del Tutor:", { ...values, userId: selectedUser });
        message.success("Tutor agregado exitosamente");
        onCancel();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Por favor, complete todos los campos correctamente");
        setShowAlert(true);
      });
  };

  return (
    <Modal
      title={
        <span>
          <UserAddOutlined /> Agregar Nuevo Tutor
        </span>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={onCancel} style={{ marginRight: "8px" }}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          icon={<UserAddOutlined />}
        >
          Guardar
        </Button>,
      ]}
      destroyOnClose
    >
      <Title level={5}>Información del Tutor</Title>

      <Alert
        message="Este modal te permite agregar un nuevo tutor."
        description="Selecciona un usuario y llena los campos correspondientes para agregarlo como tutor."
        type="info"
        showIcon
        style={{ marginBottom: "16px" }}
      />

      {showAlert && (
        <Alert
          message="Error al guardar"
          description="Por favor, asegúrese de que todos los campos estén correctamente completados."
          type="error"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}

      {users.length === 0 && !loading && (
        <Alert
          message="No hay usuarios disponibles"
          description="No se pudieron cargar usuarios. Intente nuevamente más tarde."
          type="warning"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}

      <Form
        form={form}
        name="tutor-form"
        initialValues={{ fullName: "", phone: "", address: "" }}
      >
        {loading && (
          <Alert
            message="Cargando usuarios"
            description="Por favor, espere mientras cargamos la lista de usuarios."
            type="info"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        <Form.Item
          label="Seleccionar Usuario"
          name="userId"
          rules={[{ required: true, message: "Por favor seleccione un usuario" }]}
        >
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            placeholder="Selecciona un usuario"
            loading={loading}
            notFoundContent={
              loading ? <Spin size="small" /> : "No se encontraron usuarios"
            }
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.username}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Nombre Completo"
          name="fullName"
          rules={[
            { required: true, message: "Por favor ingrese el nombre completo" },
            {
              pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
              message: "El nombre solo puede contener letras",
            },
          ]}
        >
          <Input placeholder="Ej. Juan Pérez" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[
            { required: true, message: "Por favor ingrese un teléfono válido" },
            {
              pattern: /^[+]?[0-9]{10,14}$/,
              message:
                "Por favor ingrese un teléfono válido (ej. +1234567890)",
            },
          ]}
        >
          <Input placeholder="Ej. +1234567890" />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="address"
          rules={[{ required: true, message: "Por favor ingrese la dirección" }]}
        >
          <Input placeholder="Ej. Calle Falsa 123" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTutor;