import React, { useState } from 'react';
import { Modal, Form, Select, Button, notification } from 'antd';
import axiosInstance from '../../../Api/AxiosInstance';

const { Option } = Select;

// Custom Hook para manejar la asignación de tutores
const useAssignTutor = (group, onAssignTutor, onCancel) => {
  const [isAssigning, setIsAssigning] = useState(false);

  const assignTutor = async (tutorId) => {
    setIsAssigning(true);
    try {
      await axiosInstance.put(`/groups/${group._id}/assign-tutor`, {
        tutorId,
      });

      notification.success({
        message: 'Tutor asignado/actualizado exitosamente',
        description: `El tutor ha sido asignado al grupo ${group.groupIdentifier}`,
      });

      onAssignTutor(tutorId);
      onCancel();
    } catch (error) {
      notification.error({
        message: 'Error al asignar el tutor',
        description: error.response?.data?.message || 'Hubo un problema al asignar el tutor.',
      });
    } finally {
      setIsAssigning(false);
    }
  };

  return { assignTutor, isAssigning };
};

const AssignTutorModal = ({ visible, onCancel, onAssignTutor, group, tutors }) => {
  const [form] = Form.useForm();
  const { assignTutor, isAssigning } = useAssignTutor(group, onAssignTutor, onCancel);

  const handleSubmit = async (values) => {
    await assignTutor(values.tutor);
  };

  return (
    <Modal
      title="Asignar o Actualizar Tutor"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      closable={!isAssigning}
      maskClosable={!isAssigning}
    >
      <Form 
        form={form} 
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          tutor: group?.tutor?._id
        }}
      >
        <Form.Item
          name="tutor"
          label="Seleccionar Tutor"
          rules={[{ required: true, message: 'Por favor selecciona un tutor.' }]}
        >
          <Select
            placeholder="Selecciona un tutor"
            disabled={isAssigning}
            style={{
              width: '100%',
            }}
          >
            {tutors.map((tutor) => (
              <Option value={tutor._id} key={tutor._id}>
                {tutor.username}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isAssigning}
            style={{
              backgroundColor: '#1890ff',
              borderRadius: '5px',
              borderColor: '#1890ff',
              color: '#fff',
            }}
          >
            {isAssigning ? 'Asignando...' : 'Asignar Tutor'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignTutorModal;