// UserChildForm.jsx
import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// Datos estáticos (simulación del backend)
const institutesData = [
  {
    _id: 'institute1',
    name: 'Instituto Los Pinos',
    groups: [
      { _id: 'group1', name: 'Grupo A' },
      { _id: 'group2', name: 'Grupo B' },
      { _id: 'group3', name: 'Grupo C' },
    ],
  },
  {
    _id: 'institute2',
    name: 'Instituto El Roble',
    groups: [
      { _id: 'group4', name: 'Grupo 1' },
      { _id: 'group5', name: 'Grupo 2' },
      { _id: 'group6', name: 'Grupo 3' },
    ],
  },
];

const UserChildForm = ({ form, handleSave, isEditing }) => {
  const [groups, setGroups] = useState([]);

  // Manejar cambio en el instituto seleccionado
  const handleInstituteChange = (instituteId) => {
    const selectedInstitute = institutesData.find(inst => inst._id === instituteId);
    setGroups(selectedInstitute ? selectedInstitute.groups : []);
    form.setFieldsValue({ group: undefined }); // Reiniciar selección de grupo
  };

  return (
    <>
      {/* Mensaje de instrucciones */}
      <Alert
        message="Instrucciones"
        description="Complete todos los campos obligatorios para registrar al niño. Seleccione el instituto, luego el grupo disponible."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Form form={form} onFinish={handleSave} layout="vertical">
        <Row gutter={24}>
          {/* Columna izquierda */}
          <Col xs={24} sm={12}>
            {/* Nombre del niño */}
            <Form.Item
              name="name"
              label="Nombre del Niño"
              rules={[{ required: true, message: 'Por favor, ingrese el nombre del niño' }]}
            >
              <Input placeholder="Ingrese el nombre del niño" />
            </Form.Item>

            {/* Fecha de nacimiento */}
            <Form.Item
              name="dateOfBirth"
              label="Fecha de Nacimiento"
              rules={[{ required: true, message: 'Por favor, seleccione la fecha de nacimiento' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Seleccione la fecha de nacimiento" />
            </Form.Item>

            {/* Guardián(es) asignados */}
            <Form.Item
              name="guardians"
              label="Autorizados"
              rules={[
                { required: true, message: 'Por favor, seleccione hasta 3 autorizados', type: 'array' },
                {
                  validator: (_, value) =>
                    value && value.length <= 3
                      ? Promise.resolve()
                      : Promise.reject('Solo puedes seleccionar hasta 3 autorizados'),
                },
              ]}
            >
              <Select
                mode="multiple"
                maxTagCount={3}
                placeholder="Seleccione hasta 3 autorizados"
              >
                <Option value="1">Autorizado 1</Option>
                <Option value="2">Autorizado 2</Option>
                <Option value="3">Autorizado 3</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Columna derecha */}
          <Col xs={24} sm={12}>
            {/* Tutor asignado */}
            <Form.Item
              name="tutor"
              label="Tutor Asignado"
              rules={[{ required: true, message: 'Por favor, seleccione el tutor' }]}
            >
              <Select placeholder="Seleccione el tutor">
                <Option value="1">Tutor 1</Option>
                <Option value="2">Tutor 2</Option>
              </Select>
            </Form.Item>

            {/* Instituto */}
            <Form.Item
              name="institute"
              label="Instituto"
              rules={[{ required: true, message: 'Por favor, seleccione el instituto' }]}
            >
              <Select 
                placeholder="Seleccione el instituto" 
                onChange={handleInstituteChange}
              >
                {institutesData.map(inst => (
                  <Option key={inst._id} value={inst._id}>{inst.name}</Option>
                ))}
              </Select>
            </Form.Item>

            {/* Grupo */}
            <Form.Item
              name="group"
              label="Grupo"
              rules={[{ required: true, message: 'Por favor, seleccione el grupo' }]}
            >
              <Select
                placeholder="Seleccione el grupo"
                disabled={groups.length === 0}
              >
                {groups.map(group => (
                  <Option key={group._id} value={group._id}>{group.name}</Option>
                ))}
              </Select>
            </Form.Item>

            {/* Estado del niño */}
            <Form.Item
              name="status"
              label="Estado"
              rules={[{ required: true, message: 'Por favor, seleccione el estado' }]}
              initialValue="active" // Valor por defecto
            >
              <Select>
                <Option value="active">Activo</Option>
                <Option value="inactive">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Botón de guardar */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block icon={<PlusOutlined />}>
            {isEditing ? 'Actualizar Niño' : 'Agregar Niño'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserChildForm;
