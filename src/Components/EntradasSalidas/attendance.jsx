import React, { useState } from "react";
import { Layout, Row, Col, Card, Table, Button, Modal, Form, Select, App, Tag } from "antd";
import { UserAddOutlined, LogoutOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Content, Header } = Layout;
const { Option } = Select;

const AttendanceScreen = () => {
  const [movements, setMovements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isExit, setIsExit] = useState(false);

  const { notification } = App.useApp();

  // Datos simulados
  const childrenList = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "Ana Gómez" },
  ];

  const authorizedPersons = ["Padre", "Madre", "Tutor"];

  const simulateMovement = (type, child, responsiblePerson) => {
    const movement = {
      id: movements.length + 1,
      time: moment().format("HH:mm:ss"),
      name: child.name,
      responsiblePerson,
      action: type === "exit" ? "Salida" : "Entrada",
    };
    setMovements([movement, ...movements]);
    notification.success({
      message: `${type === "entry" ? "Entrada" : "Salida"} registrada`,
      description: `El niño/a ${child.name} ha ${
        type === "entry" ? "ingresado" : "salido"
      } a las ${moment().format("HH:mm:ss")}.`,
    });
  };

  const handleAddMovement = (type) => {
    setIsModalOpen(true);
    setIsExit(type === "exit");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    const { child, responsiblePerson } = values;
    const selectedChild = childrenList.find((c) => c.id === child);
    simulateMovement(isExit ? "exit" : "entry", selectedChild, responsiblePerson);
    handleCancel();
  };

  const columns = [
    {
      title: "Nombre del Niño",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Acción",
      dataIndex: "action",
      key: "action",
      render: (action) => (
        <Tag color={action === "Entrada" ? "green" : "red"}>{action}</Tag>
      ),
    },
    {
      title: "Hora",
      dataIndex: "time",
      key: "time",
      render: (time) => (
        <>
          <ClockCircleOutlined style={{ marginRight: "5px", color: "#1890ff" }} />
          {time}
        </>
      ),
    },
    {
      title: "Responsable",
      dataIndex: "responsiblePerson",
      key: "responsiblePerson",
    },
  ];

  return (
    <Layout>
      <Header style={{ background: "#1890ff", color: "white", padding: "10px 20px" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Gestión de Entradas y Salidas</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        {/* Resumen de acciones */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={12}>
            <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "white",
                  fontWeight: "bold",
                  width: "100%",
                }}
                onClick={() => handleAddMovement("entry")}
              >
                Registrar Entrada
              </Button>
            
          </Col>
          <Col xs={24} sm={12} lg={12}>
           <Button
                type="primary"
                icon={<LogoutOutlined />}
                size="large"
                style={{
                  backgroundColor: "#FF4D4F",
                  borderColor: "#FF4D4F",
                  color: "white",
                  fontWeight: "bold",
                  width: "100%",
                }}
                onClick={() => handleAddMovement("exit")}
              >
                Registrar Salida
              </Button>
          </Col>
        </Row>

        {/* Tabla de movimientos */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <Card title="Movimientos Recientes">
              <Table
                columns={columns}
                dataSource={movements}
                pagination={false}
                scroll={{ x: 400 }} // Soporte para scroll horizontal en pantallas pequeñas
              />
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Modal de registro */}
      <Modal
        title={isExit ? "Registrar Salida" : "Registrar Entrada"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Niño"
            name="child"
            rules={[{ required: true, message: "Selecciona un niño" }]}
          >
            <Select placeholder="Selecciona al niño">
              {childrenList.map((child) => (
                <Option key={child.id} value={child.id}>
                  {child.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Persona Responsable"
            name="responsiblePerson"
            rules={[{ required: true, message: "Selecciona a la persona responsable" }]}
          >
            <Select placeholder="Selecciona a la persona responsable">
              {authorizedPersons.map((person) => (
                <Option key={person} value={person}>
                  {person}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Confirmar
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AttendanceScreen;
