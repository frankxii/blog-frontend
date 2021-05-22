import React from 'react'
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import request from "../request"
import {backSystemApi} from "../api"

export default function Login() {
  const [form] = Form.useForm()

  const onFinish = (userInfo: { username: string, password: string }) => {
    request(backSystemApi.addToken, userInfo)
      .then(res => {
        if (res !== undefined) {
          form.resetFields()
          localStorage.setItem('token', res.data)
          window.location.reload()
        }
      })
  }

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="username"
        // rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input prefix={<UserOutlined/>} placeholder="用户名"/>
      </Form.Item>
      <Form.Item
        name="password"
        // rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input
          prefix={<LockOutlined/>}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            // type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({errors}) => errors.length).length
            }
          >
            登录
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}