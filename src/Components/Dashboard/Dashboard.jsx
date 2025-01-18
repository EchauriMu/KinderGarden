import React from "react";
import { Layout, Row, Col, Card, Statistic, Table, Button, Tag } from "antd";
import { UserOutlined, BellOutlined, ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const Dashboard = () => {
  // Datos simulados
  const data = [
    {
      key: "1",
      childName: "Juan Pérez",
      group: "Grupo A",
      action: "Entrada",
      time: "08:30 AM",
    },
    {
      key: "2",
      childName: "Ana Gómez",
      group: "Grupo B",
      action: "Salida",
      time: "09:15 AM",
    },
    {
      key: "3",
      childName: "Luis Ramírez",
      group: "Grupo A",
      action: "Entrada",
      time: "09:45 AM",
    },
  ];

  // Configuración de colores para las acciones
  const actionColors = {
    Entrada: "green",
    Salida: "red",
  };

  const columns = [
    {
      title: "Nombre del Niño",
      dataIndex: "childName",
      key: "childName",
    },
    {
      title: "Grupo",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Acción",
      dataIndex: "action",
      key: "action",
      render: (action) => (
        <Tag color={actionColors[action]} style={{ fontWeight: "bold" }}>
          {action}
        </Tag>
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
  ];

  return (
    <Layout>
      <Header style={{ background: "#1890ff", padding: "10px 20px", color: "white" }}>
        <h1 style={{ color: "white", margin: 0, fontSize: "1.5rem" }}>Dashboard - KinderGarden</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        {/* Resumen en tiempo real */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card>
              <Statistic
                title="Niños Presentes"
                value={45}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card>
              <Statistic
                title="Entradas Hoy"
                value={67}
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card>
              <Statistic
                title="Salidas Hoy"
                value={50}
                prefix={<ArrowDownOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Accesos Rápidos */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <Card title="Accesos Rápidos" bordered={false}>
              <Button
                type="primary"
                icon={<UserOutlined />}
                style={{ marginBottom: "10px", marginRight: "10px" }}
              >
                Gestión de Usuarios
              </Button>
              <Button
                type="primary"
                icon={<BellOutlined />}
                style={{ marginBottom: "10px", marginRight: "10px" }}
              >
                Notificaciones
              </Button>
              <Button type="primary" icon={<ArrowUpOutlined />}>
                Entradas/Salidas
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Entradas/Salidas Recientes */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <Card title="Entradas y Salidas Recientes" bordered={false}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ x: 400 }} // Permite scroll horizontal en dispositivos pequeños
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
