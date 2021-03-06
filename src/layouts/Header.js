import React from 'react';
import { Menu, Dropdown, Icon, Affix } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import router from 'umi/router';

const MenuItem = Menu.Item;

const Header = ({ location }) => {
  const menu = (
    <Menu>
      <MenuItem onClick={() => {
        localStorage.clear();
        router.push('/login');
      }}>退出</MenuItem>
    </Menu>
  );
  return (
    <Affix offsetTop={0}>
      <div className="header">
        <img className="logo" src={require('@/assets/logo2.png')} alt="logo" />
        <Menu className="menus" mode="horizontal" theme="dark">
          <MenuItem key="/" selectedKeys={[location.pathname]}>
            <Link to="/">首页</Link>
          </MenuItem>
          <MenuItem key="/users" selectedKeys={[location.pathname]}>
            <Link to="/users">用户</Link>
          </MenuItem>
          <MenuItem key="/reports" selectedKeys={[location.pathname]}>
            <Link to="/reports">周报</Link>
          </MenuItem>
        </Menu>
        <div className="right">
          <Dropdown overlay={menu}>
            <a className="a" href="www.baidu.com">
              <Icon type="user" style={{ marginRight: 3 }} />
              {localStorage.username}
            </a>
          </Dropdown>
        </div>
      </div>
    </Affix>
  );
};

export default withRouter(Header);
