import React, { Component } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { withClick } from '@/utils/hoc';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class Usermodal extends Component {
  state = {
    visible: false,
  };

  handOpenClick = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values).then(res => {
          if (res && res.state === 'success') {
            this.handOpenClick();
          }
        });
      }
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      children,
      addLoading,
      title,
      record: { username, nickname, type },
    } = this.props;
    const { visible } = this.state;
    return (
      <>
        {withClick(children, this.handOpenClick)}
        <Modal
          title={title}
          visible={visible}
          cancelText="取消"
          okText="确定"
          onCancel={this.handOpenClick}
          onOk={this.handleOk}
          confirmLoading={addLoading}
        >
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
                initialValue: username,
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: '请输入名字',
                  },
                ],
                initialValue: nickname,
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem label="用户类型" {...formItemLayout}>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择' }],
                initialValue: type || '1',
              })(
                <RadioGroup>
                  <Radio value={'0'}>管理员</Radio>
                  <Radio value={'1'}>普通用户</Radio>
                </RadioGroup>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </>
    );
  }
}
Usermodal.defaultProps = {
  title: '添加用户',
  record: {},
};

export default Form.create()(Usermodal);
