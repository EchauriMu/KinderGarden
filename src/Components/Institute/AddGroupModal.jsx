import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { NumberOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import axiosInstance from '../../Api/AxiosInstance';

const { Option } = Select;

const LETTERS = ['A', 'B', 'C', 'D'];

// Custom Hooks
const useFetchTutors = (shouldFetch) => {
  const [tutors, setTutors] = useState([]);
  const [isLoadingTutors, setIsLoadingTutors] = useState(false);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchTutors = async () => {
      setIsLoadingTutors(true);
      try {
        const response = await axiosInstance.get('/tutors/getbyinst');
        setTutors(response.data);
      } catch (error) {
        notification.error({
          message: 'Error al cargar los tutores',
          description: 'Hubo un problema al cargar la lista de tutores.',
        });
      } finally {
        setIsLoadingTutors(false);
      }
    };

    fetchTutors();
  }, [shouldFetch]);

  return { tutors, isLoadingTutors };
};

const useGroupManagement = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createGroup = async (groupData) => {
    setIsCreating(true);
    try {
      return await axiosInstance.post('groups/create/group', groupData);
    } finally {
      setIsCreating(false);
    }
  };

  return { createGroup, isCreating };
};

const AddGroupModal = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();
  const { tutors, isLoadingTutors } = useFetchTutors(isModalVisible);
  const { createGroup, isCreating } = useGroupManagement();

  const handleSubmit = async (values) => {
    try {
      // Construimos el identificador del grupo
      const groupIdentifier = `${values.grade}${values.groupLetter}`; // Formato como '5B', '10C'

      await createGroup({
        groupIdentifier,
        description: values.description,
        tutor: values.tutor,
      });

      notification.success({
        message: 'Grupo añadido',
        description: `El grupo ${groupIdentifier} se ha añadido correctamente.`,
      });

      handleCancel();
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error al añadir el grupo',
        description: error.response?.data?.message || 'Hubo un problema al añadir el grupo.',
      });
    }
  };

  const isLoading = isLoadingTutors || isCreating;

  return (
    <Modal
      title="Añadir Grupo"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={500}
      closable={!isLoading}
      maskClosable={!isLoading}
      centered
    >
      <Form 
        form={form} 
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Grado"
              name="grade"
              rules={[
                {
                  required: true,
                  pattern: /^[1-9]$|^1[0-2]$/, // Solo permite 1-12
                  message: 'El grado debe ser un número entre 1 y 12.',
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Ejemplo: 5"
                prefix={<NumberOutlined style={{ color: '#1890ff' }} />}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Letra del Grupo"
              name="groupLetter"
              rules={[{ required: true, message: 'Selecciona una letra.' }]}
            >
              <Select
                placeholder="Selecciona la letra"
                suffixIcon={<AppstoreAddOutlined style={{ color: '#1890ff' }} />}
                disabled={isLoading}
              >
                {LETTERS.map((letter) => (
                  <Option value={letter} key={letter}>
                    {letter}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Tutor"
          name="tutor"
          rules={[{ required: true, message: 'Selecciona un tutor.' }]}
        >
          <Select
            placeholder="Selecciona un tutor"
            disabled={isLoading}
            loading={isLoadingTutors}
          >
            {tutors.map((tutor) => (
              <Option value={tutor._id} key={tutor._id}>
                {tutor.username}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item 
          label="Descripción" 
          name="description"
        >
          <Input.TextArea
            placeholder="Descripción opcional"
            rows={4}
            style={{
              borderRadius: '8px',
              padding: '10px',
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
              backgroundColor: '#1890ff',
              borderRadius: '5px',
              borderColor: '#1890ff',
              color: '#fff',
            }}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
