import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Skeleton } from "antd";  // Importa Skeleton de Ant Design
import { HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import axiosInstance from "../../Api/AxiosInstance";  // Instancia de axios

const InstituteInfo = () => {
  // Estado para manejar la información del instituto
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la petición a la API con Axios
    axiosInstance.get(`/institutes/getbyid`)
      .then((response) => {
        setInstitute(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Hubo un error al cargar la información del instituto.");
        setLoading(false);
      });
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  if (loading) {
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} />  {/* Skeleton con 1 fila de texto */}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} />  {/* Skeleton con 1 fila de texto */}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} />  {/* Skeleton con 1 fila de texto */}
          </Card>
        </Col>
      </Row>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card>
          <Statistic
            title="Nombre del Instituto"
            value={institute.name}
            prefix={<HomeOutlined />}
            valueStyle={{ fontSize: "18px" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card>
          <Statistic
            title="Dirección"
            value={institute.address}
            prefix={<HomeOutlined />}
            valueStyle={{ fontSize: "16px" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card>
          <Statistic
            title="Teléfono"
            value={institute.phone}
            prefix={<PhoneOutlined />}
            valueStyle={{ fontSize: "16px" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default InstituteInfo;
