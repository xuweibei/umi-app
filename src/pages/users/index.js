/**
 * title: 用户
 */

import { Button, message, Popconfirm } from 'antd';
import React from 'react';
import { Content, Tool } from '@/components/Layout';
import Table from '@/components/Table';
import { connect } from 'dva';
import UserModal from './components/Usermodal';

function index({
  list,
  dispatch,
  loading,
  addLoading,
  removeLoading,
  editLoading,
  page,
  pageSize,
  total,
}) {
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
          <UserModal
            title="编辑用户"
            record={record}
            onOk={values => handleEdit(record.id, values)}
            addLoading={editLoading}
          >
            <a>编辑</a>
          </UserModal>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record.id)}>
            <a> 删除</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  //删除
  const handleDelete = id => {
    dispatch({
      type: 'users/remove',
      payload: id,
    }).then(res => {
      if (res && res.state === 'success') {
        message.success(res.msg || '删除成功');
        reload();
      } else {
        message.error('删除失败');
      }
    });
  };

  //点击编辑
  const handleEdit = (id, values) => {
    return dispatch({
      type: 'users/edit',
      payload: { ...values, id },
    }).then(res => {
      if (res && res.state === 'success') {
        message.success(res.msg || '添加成功');
        reload();
        return res;
      } else {
        message.error('添加失败');
      }
    });
  };

  //重新刷新
  const reload = () => {
    dispatch({
      type: 'users/fetch',
      payload: {
        page: 1,
      },
    });
  };

  //点击添加
  const addData = values => {
    return dispatch({
      type: 'users/add',
      payload: values,
    }).then(res => {
      if (res && res.state === 'success') {
        message.success(res.msg);
        reload();
        return res;
      } else {
        message.error('添加失败');
      }
    });
  };

  //点击页码切换
  const handleChange = num => {
    if (num !== page) {
      dispatch({ type: 'users/fetch', payload: { page: num } });
    }
  };
  return (
    <Content>
      <Tool>
        <UserModal onOk={addData} addLoading={addLoading}>
          <Button type="primary">添加用户</Button>
        </UserModal>
      </Tool>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={item => item.id}
        loading={loading || removeLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: handleChange,
        }}
      />
    </Content>
  );
}

export default connect(({ users, loading }) => ({
  ...users,
  loading: loading.effects['users/fetch'],
  addLoading: loading.effects['users/add'],
  editLoading: loading.effects['users/edit'],
  removeLoading: loading.effects['users/remove'],
}))(index);
