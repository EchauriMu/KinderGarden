// GroupList.jsx
import React, { useState, useEffect } from "react";
import { List, Typography, Card, Input, Pagination, Skeleton, Button, Row, Col, Tag, Space } from "antd";
import { TeamOutlined, ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchGroups, fetchTutors } from "./ApiCalls";  // Importa las funciones de API
import AssignTutorModal from "./AssignTutorModal";
import DeleteGroupModal from "./DeletedGroups";

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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  const pageSize = 5;

  // Llamada a las funciones de API dentro de useEffect
  useEffect(() => {
    fetchGroups(setGroups, setFilteredGroups, setLoading);
    fetchTutors(setTutors);
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

  return (
    <Card style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12}>
          <Space>
            <TeamOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <Title level={4} style={{ margin: 0 }}>
              Lista de Grupos
            </Title>
          </Space>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px", gap: "10px" ,display:"flex", alignItems: "center"}}>
        <Col xs={24} sm={12} md={12}>
          <Input
            placeholder="Filtrar por grado (ejemplo: 5)"
            value={searchGrade}
            onChange={handleFilter}
            style={{ width: "100%", borderRadius: "5px", borderColor: "#1890ff" }}
          />
        </Col>
        <Button
          type="primary"
          size="small"
          icon={<ReloadOutlined />}
          onClick={() => fetchGroups(setGroups, setFilteredGroups, setLoading)}
          style={{ backgroundColor: "#F2862B", borderColor: "#F2862B" , alignContent:"center"}}
        >
          Recagar
        </Button>
      </Row>

      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <>
          <List
            itemLayout="vertical"
            dataSource={paginatedGroups}
            renderItem={(group) => (
              <List.Item style={{ padding: "16px", borderBottom: "1px solid #f0f0f0", borderRadius: "5px", marginBottom: "10px" }}>
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={4}>
                    <Title level={5} style={{ margin: 0, color: "#F2862B" }}>
                      {group.groupIdentifier}
                    </Title>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div style={{ wordBreak: "break-word" }}>
                      {group.description || "Sin descripción"}
                    </div>
                  </Col>
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
                  <Col xs={24} sm={4}>
                    <Button
                      variant="outlined"
                      onClick={() => showGroupModal(group, setSelectedGroup, setIsModalVisible)}
                      style={{ marginRight: "5px" }}
                      size="small"
                      color="blue"
                    >
                      {group.tutor ? "Actualizar Tutor" : "Añadir Tutor"}
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      size="small"
                      onClick={() => showDeleteModal(group, setGroupToDelete, setDeleteModalVisible)}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
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

      <AssignTutorModal
        visible={isModalVisible}
        onCancel={() => handleCancelModal(setIsModalVisible, setSelectedGroup)}
        onAssignTutor={() => fetchGroups(setGroups, setFilteredGroups, setLoading)}
        group={selectedGroup}
        tutors={tutors}
      />

      <DeleteGroupModal
        visible={deleteModalVisible}
        onCancel={() => handleCancelDeleteModal(setDeleteModalVisible, setGroupToDelete)}
        groupIdentifier={groupToDelete?.groupIdentifier || ""}
        fetchGroups={() => fetchGroups(setGroups, setFilteredGroups, setLoading)}
      />
    </Card>
  );
};

export default GroupList;
