import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Header from './Header';
import Footer from './Footer';

import './index.scss';
import router from 'umi/router';

const { Content } = Layout;

function BasicLayout({ children, location }) {
  if (!localStorage.username && location.pathname !== '/login') {
    router.push('/login')
  }
  if (localStorage.username && location.pathname === '/login') {
    router.push('/')
  }
  if (location.pathname === '/login') {
    return children;
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="basic-layout">
        <Header />
        <Content className="content">{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
