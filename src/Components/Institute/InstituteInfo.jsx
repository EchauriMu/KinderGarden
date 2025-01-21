import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Skeleton } from "antd";
import { HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; // Importa Framer Motion
import axiosInstance from "../../Api/AxiosInstance";

const InstituteInfo = () => {
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/institutes/getbyid`)
      .then((response) => {
        setInstitute(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Hubo un error al cargar la información del instituto.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card>
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
      <Col xs={24} sm={24} md={12} lg={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <Statistic
              title="Nombre del Instituto"
              value={institute.name}
              prefix={<HomeOutlined />}
              valueStyle={{ fontSize: "18px" }}
            />
          </Card>
        </motion.div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <Statistic
              title="Dirección"
              value={institute.address}
              prefix={<HomeOutlined />}
              valueStyle={{ fontSize: "16px" }}
            />
          </Card>
        </motion.div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <Statistic
              title="Teléfono"
              value={institute.phone}
              prefix={<PhoneOutlined />}
              valueStyle={{ fontSize: "16px" }}
            />
          </Card>
        </motion.div>
      </Col>
    </Row>
  );
};

export default InstituteInfo;
