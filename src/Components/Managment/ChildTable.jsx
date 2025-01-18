// ChildTable.jsx
import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ChildTable = ({ children, handleEdit, handleDelete }) => {
  const childColumns = [
    {
      title: 'Child Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={childColumns}
      dataSource={children}
      rowKey="key"
      pagination={false}
      bordered
    />
  );
};

export default ChildTable;
