// components/AssignTutorModal.js
import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, notification } from "antd";
import axiosInstance from "../../Api/AxiosInstance";

const { Option } = Select;

const AssignTutorModal = ({ visible, onCancel, onAssignTutor, group, tutors }) => {
  const [form] = Form.useForm(); // Usamos el formulario de Ant Design

  // Manejar la asignación del tutor
  const handleAssign = async () => {
    try {
      const values = await form.validateFields();
      const tutorId = values.tutor;

      // Llamar a la API para asignar el tutor al grupo
      const response = await axiosInstance.put(`/institutes/${group._id}/assign-tutor`, {
        tutorId,
      });

      notification.success({
        message: `Tutor asignado/actualizado exitosamente`,
        description: `El tutor ha sido asignado al grupo ${group.groupIdentifier}`,
      });

      // Llamamos a la función para actualizar el grupo
      onAssignTutor(tutorId);

      // Cerrar el modal
      onCancel();
    } catch (error) {
      notification.error({
        message: "Error al asignar el tutor",
        description: error.message || "Hubo un problema al asignar el tutor.",
      });
    }
  };

  return (
    <Modal
      title="Asignar o Actualizar Tutor"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} onFinish={handleAssign}>
        <Form.Item
          name="tutor"
          label="Seleccionar Tutor"
          rules={[{ required: true, message: "Por favor selecciona un tutor." }]}
          initialValue={group?.tutor ? group.tutor._id : undefined} // Si ya tiene un tutor, lo precargamos
        >
          <Select placeholder="Selecciona un tutor" style={{ width: "100%" }}>
            {tutors.map((tutor) => (
              <Option value={tutor._id} key={tutor._id}>
                {tutor.username}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Asignar Tutor
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignTutorModal;
