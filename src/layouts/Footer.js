import React from 'react';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;

export default function Index() {
    return (
        <Footer className='footer'>
            Copyright <Icon type='copyright' />
        </Footer>
    )
}
