import React, {useState, useEffect} from 'react'
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons'

export default function Login() {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState({})

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = (values: any) => {
    console.log('Finish:', values)
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