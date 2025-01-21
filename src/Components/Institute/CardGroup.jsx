// components/GroupList.js
import React, { useState, useEffect } from "react";
import { List, Typography, Card, Input, Pagination, Skeleton, notification, Button, Row, Col, Tag ,Space} from "antd";
import { TeamOutlined, ReloadOutlined } from "@ant-design/icons";
import axiosInstance from "../../Api/AxiosInstance";
import AssignTutorModal from "./AssignTutorModal";

const { Title } = Typography;

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchGrade, setSearchGrade] = useState("");
  const [tutors, setTutors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const pageSize = 5;

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/institutes/get/groups");
      const data = response.data;

      if (Array.isArray(data)) {
        setGroups(data);
        setFilteredGroups(data);
      } else {
        notification.error({
          message: "Error al obtener grupos",
          description: "La respuesta de la API no es válida.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error de conexión",
        description: error.response?.data?.message || "No se pudo conectar con el servidor.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTutors = async () => {
    try {
      const response = await axiosInstance.get("/tutors/getbyinst");
      setTutors(response.data);
    } catch (error) {
      notification.error({
        message: "Error al cargar los tutores",
        description: "Hubo un problema al cargar la lista de tutores.",
      });
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchTutors();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchGrade(value);

    if (value === "") {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        group.groupIdentifier.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGroups(filtered);
    }

    setCurrentPage(1);
  };

  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const showModal = (group) => {
    setSelectedGroup(group);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedGroup(null);
  };

  // Modificada para actualizar la lista después de asignar un tutor
  const handleAssignTutor = async (tutorId, tutorUsername) => {

    // Refrescar la lista completa
    await fetchGroups();
  };

  return (
    <Card
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      {/* Header con título y botón refresh */}
      <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12}>
          <Space>
            <TeamOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <Title level={4} style={{ margin: 0 }}>Lista de Grupos</Title>
          </Space>
        </Col>
    
      </Row>

      {/* Filtro */}
      <Row style={{ marginBottom: "20px",gap:'10px' }}>
        <Col xs={24} sm={12} md={12}>
          <Input
            placeholder="Filtrar por grado (ejemplo: 5)"
            value={searchGrade}
            onChange={handleFilter}
            style={{
              width: "100%",
              borderRadius: "5px",
              borderColor: "#1890ff",
            }}
          />
        </Col>
      
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchGroups}
            style={{ backgroundColor: "#F2862B", borderColor: "#F2862B" }}
          >
            Refresh
          </Button>
        
      </Row>

      {/* Lista de grupos */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <>
          <List
            itemLayout="vertical"
            dataSource={paginatedGroups}
            renderItem={(group) => (
              <List.Item
                style={{
                  padding: "16px",
                  borderBottom: "1px solid #f0f0f0",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <Row gutter={[16, 16]} align="middle">
                  {/* Identificador del grupo */}
                  <Col xs={24} sm={6}>
                    <Title level={5} style={{ margin: 0, color: "#F2862B" }}>
                      {group.groupIdentifier}
                    </Title>
                  </Col>

                  {/* Descripción */}
                  <Col xs={24} sm={8}>
                    <div style={{ wordBreak: "break-word" }}>
                      {group.description || "Sin descripción"}
                    </div>
                  </Col>

                  {/* Tag del tutor */}
                  <Col xs={24} sm={6}>
                    {group.tutor ? (
                      <Tag color="green" style={{ margin: "4px 0" }}>
                        {group.tutor.username}
                      </Tag>
                    ) : (
                      <Tag color="red" style={{ margin: "4px 0" }}>
                        Sin Tutor
                      </Tag>
                    )}
                  </Col>

                  {/* Botón de acción */}
                  <Col xs={24} sm={4} style={{ textAlign: 'right' }}>
                    <Button
                     variant="outlined"
                      onClick={() => showModal(group)}
                      style={{ width: '100%' }}
                      size="small"
                      color="blue"
                    >
                      {group.tutor ? "Actualizar Tutor" : "Añadir Tutor"}
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            )}
          />

          {/* Paginación */}
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Col>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredGroups.length}
                onChange={(page) => setCurrentPage(page)}
              />
            </Col>
          </Row>
        </>
      )}

      {/* Modal para asignar tutor */}
      <AssignTutorModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onAssignTutor={handleAssignTutor}
        group={selectedGroup}
        tutors={tutors}
      />
    </Card>
  );
};

export default GroupList;