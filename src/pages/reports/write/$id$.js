/**
 * title: 写周报
 */

import React, { Component } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { Content } from '@/components/Layout';
import E from 'wangeditor';
import { connect } from 'dva';
import router from 'umi/router'


const Option = Select.Option;

class $id$ extends Component {

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
  }
  state = {
    editorContent: '',
    editorCheck: true
  };
  componentDidMount() {
    if (this.id) {
      this.getDatas().then(res => {
        if (res && res.state === 'success') {
          const { content } = res.data;
          this.setState({
            editorContent: content
          })
          this.renderEditor();
        }
      })
    }
    this.renderEditor();
    this.getAllUsers();
  }

  getDatas = () => {
    return this.props.dispatch({
      type: 'reports/fetchInfo',
      payload: this.id
    })
  }

  getAllUsers = () => {
    this.props.dispatch({
      type: 'reports/getUsers',
      payload: {}
    })
  }

  renderEditor = () => {
    const editor = new E(this.refs.editorRefs);
    let timer = null;
    editor.customConfig.onchange = (html) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        let editorCheck = true;
        if (!html || html == '<p><br></p>') {
          editorCheck = false;
        }
        this.setState({
          editorContent: html,
          editorCheck
        });
      }, 500)
    };
    editor.create();
  };

  getSelectOption = () => {
    const { userlist } = this.props;
    return <Select placeholder="请输入周报标题" >
      {
        userlist.map(item => <Option value={item.username} key={item.id}>{item.nickname}</Option>)
      }
    </Select>
  }

  handleSumbit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { editorCheck, editorContent } = this.state;
        if (editorCheck && editorContent) {
          this.props.dispatch({
            type: this.id ? 'reports/update' : 'reports/add',
            payload: { ...values, content: editorContent, id: this.id }
          }).then(res => {
            console.log(res)
            if (res && res.state === 'success') {
              message.success(res.msg || '周报提交成功')
              router.push('/reports')
            } else {
              message.error('周报提交失败')
            }
          })
        } else {
          this.setState({
            editorCheck: false
          })
        }
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      info: { title, receiverName, content }
    } = this.props;
    const { editorCheck } = this.state;
    return (
      <Content>
        <Form>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入周报标题',
                },
              ],
              initialValue: title
            })(<Input placeholder="请输入周报标题" />)}
          </Form.Item>
          <Form.Item label="接收人">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请选择接收人',
                },
              ],
              initialValue: receiverName
            })(this.getSelectOption())}
          </Form.Item>
          <Form.Item label='内容' required>
            <div
              ref="editorRefs"
              style={editorCheck ? { border: '1px solid #eee' } : { border: '1px solid red' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {!editorCheck && <p style={{ color: 'red' }}>请输入内容</p>}
          </Form.Item>
          <Form.Item>
            <Button>取消</Button>
            <Button type="primary" onClick={this.handleSumbit}>确定</Button>
          </Form.Item>
        </Form>
      </Content>
    );
  }
}

export default connect(({ reports }) => ({
  ...reports
}))(Form.create()($id$));
