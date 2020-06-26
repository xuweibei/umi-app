/**
 * title: 周报
 */

import React, { Component } from 'react';
import { Content, Tool } from '@/components/Layout';
import { Button } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva'
import List from './component/list'

class index extends Component {
  render() {

    return (
      <Content>
        <Tool>
          <Button type="primary">
            <Link to="/reports/write">写周报</Link>
          </Button>
          <List />
        </Tool>
      </Content>
    );
  }
}
export default connect(({ reports }) => ({
  ...reports
}))(index);
