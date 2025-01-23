import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Select, Button, Typography, Spin, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axiosInstance from "../../Api/AxiosInstance";
import notificationConfig from "../../utils/notifications"; // Importamos la configuración

const { Title } = Typography;
const { Option } = Select;

const ModalTutor = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // Mensaje dinámico del alerta
  const [alertType, setAlertType] = useState(""); // Tipo de alerta (error, warning, etc.)
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de carga del botón

  // Fetch users from the backend
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
      notificationConfig('error', 'Error al cargar usuarios', 'Intenta nuevamente.');
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

  // Handle user selection change
  const handleUserChange = (value) => {
    setSelectedUser(value);
    form.setFieldsValue({ userId: value });
  };

  // Handle form submit and create tutor
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const tutorData = {
        userId: selectedUser, // The selected user ID
        fullName: values.fullName,
        phone: values.phone,
        address: values.address
      };

      // Establecer el estado de carga al enviar el formulario
      setIsSubmitting(true);

      // Hacer POST request al backend para crear el tutor
      const response = await axiosInstance.post("/tutors/create", tutorData);

      // Check if the response is successful
      if (response.status === 201) {
        notificationConfig('success', 'Tutor agregado exitosamente', 'El tutor ha sido agregado correctamente.');
        onCancel(); // Close the modal
      }
    } catch (error) {
      console.error("Error al crear tutor:", error);

      // Restablecemos el estado de alertas
      setShowAlert(true);

      // Verificamos si la respuesta del error contiene un mensaje
      let errorMessage = 'Error al agregar tutor, por favor intente nuevamente.';

      // Si la respuesta contiene un mensaje del backend, lo usamos
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // El mensaje de error de la API
      }

      // Mostrar el mensaje de error en el estado
      setAlertMessage(errorMessage);
      setAlertType("error"); // Indicamos que es un error
    } finally {
      // Restablecer el estado de carga después de que la promesa haya terminado
      setIsSubmitting(false);
    }
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
          loading={isSubmitting} // Mostrar el estado de carga
          disabled={isSubmitting} // Deshabilitar el botón durante la carga
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>,
      ]}
      destroyOnClose
    >
      <Title level={5}>Información del Tutor</Title>

      {/* Solo mostramos este alert si hay un error */}
      {showAlert && (
        <Alert
          message="Error al guardar"
          description={alertMessage}
          type={alertType} // Tipo dinámico de alerta
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}

      {users.length === 0 && !loading && !showAlert && (
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
              message: "Por favor ingrese un teléfono válido (ej. +1234567890)",
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
