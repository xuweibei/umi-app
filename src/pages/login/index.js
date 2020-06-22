import React from 'react';
import { Layout, Icon, Form, Input, Button } from 'antd';
import { login } from './serivers';

import styles from './index.scss';
import router from 'umi/router';

const { Content, Footer } = Layout;
const IconStyle = { color: 'rgba(0,0,0,0.25)' };

const Login = ({ form }) => {
  const { getFieldDecorator } = form;
  const handleSubmit = () => {
    const { validateFields } = form;
    validateFields((err, values) => {
      // console.log(err, values, '是的李开复');
      if (!err) {
        login(values).then(data => {
          console.log(data);
          if (data && data.state === 'suc') {
            router.push('/');
          }
        });
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
              <Button onClick={handleSubmit} type="primary" style={{ width: '100%' }}>
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

export default LoginWrap;
