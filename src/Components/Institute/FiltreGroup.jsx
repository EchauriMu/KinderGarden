// GroupFilter.js
import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const GroupFilter = ({ searchGrade, onFilterChange, onRefresh }) => {
  return (
    <Row style={{ marginBottom: "20px", gap: '10px' }}>
      <Col xs={24} sm={12} md={12}>
        <Input
          placeholder="Filtrar por grado (ejemplo: 5)"
          value={searchGrade}
          onChange={onFilterChange}
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
        onClick={onRefresh}
        style={{ backgroundColor: "#F2862B", borderColor: "#F2862B" }}
      >
        Refresh
      </Button>
    </Row>
  );
};

export default GroupFilter;
