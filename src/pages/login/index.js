import React from 'react';
import { Layout, Icon, Form, Input, Button, message } from 'antd';
import { login } from './serivers';

import styles from './index.scss';
import router from 'umi/router';
import jwt_decode from 'jwt-decode';
import { connect } from 'dva';

const { Content, Footer } = Layout;
const IconStyle = { color: 'rgba(0,0,0,0.25)' };

const Login = ({ form, loading, dispatch }) => {
  const { getFieldDecorator } = form;
  const handleSubmit = () => {
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/loginIn',
          payload: values
        }).then(data => {
          if (data && data.state === 'suc') {
            const token = jwt_decode(data.token);
            const { username, id, nickname, type } = token;
            localStorage.setItem('username', username);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('userId', id);
            localStorage.setItem('authority', type === '0' ? 'admin' : 'user');
            message.success('登录成功');
            setTimeout(() => {
              router.push('/');
            }, 500)
          } else {
            message.error('登录失败')
          }
        })
      }
    });
  };

  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.form}>
          <h1>
            <img src={require('@/assets/logo2.png')} alt="logo2" />
            管理系统
          </h1>
          <Form>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={IconStyle} />}
                  placeholder="请输入用户名"
                  autoFocus
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={IconStyle} />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button loading={loading} onClick={handleSubmit} type="primary" style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className={styles.footer}>
        Copyright <Icon type="copyright" />
      </Footer>
    </Layout>
  );
};

const LoginWrap = Form.create()(Login);

export default connect(({ loading }) => ({
  loading: loading.effects['login/loginIn']
}))(LoginWrap);
