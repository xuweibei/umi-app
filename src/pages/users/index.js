/**
 *
 * title: 用户
 */

import { Button } from 'antd';
import React from 'react';
import { Content, Tool } from '@/components/Layout';
import Table from '@/components/Table';
import { connect } from 'dva';

function index({ list }) {
  const columns = [
    {
      key: 'username',
      title: '用户名',
      dataIndex: 'username',
      width: '25%',
    },
    {
      key: 'nickname',
      title: '姓名',
      dataIndex: 'nickname',
      width: '25%',
    },
    {
      key: 'type',
      title: '用户类型',
      dataIndex: 'type',
      width: '25%',
      render: text => (text === '0' ? '管理者' : '普通用户'),
    },
    {
      key: 'operation',
      title: '操作',
      render: (text, record) => (
        <div>
          <a>编辑</a>
          <a> 删除</a>
        </div>
      ),
    },
  ];
  return (
    <Content>
      <Tool>
        <Button type="primary">添加用户</Button>
      </Tool>
      <Table columns={columns} dataSource={list} rowKey={item => item.id} />
    </Content>
  );
}

export default connect(({ users }) => ({
  ...users,
}))(index);
