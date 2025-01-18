// UserTable.jsx
import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = ({ users, handleEdit, handleDelete }) => {
  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
      columns={userColumns}
      dataSource={users}
      rowKey="key"
      pagination={false}
      bordered
    />
  );
};

export default UserTable;
