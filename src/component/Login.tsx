import React, {useState} from 'react'

import {Form, Input, Button, Avatar, Space} from 'antd';
import {UserOutlined, LockOutlined, CheckOutlined} from '@ant-design/icons'

import request from "../request"
import {backSystemApi} from "../api"

export default function Login(props: any) {
  const [form] = Form.useForm()
  const hasLogin = !!localStorage.getItem('token')
  const [loginClicked, setLoginClicked] = useState<boolean>(false)
  const username = localStorage.getItem('username') || 'Guest'

  const onLogIn = (userInfo: { username: string, password: string }) => {
    if (userInfo.username && userInfo.password) {
      request(backSystemApi.addToken, userInfo)
        .then(res => {
          if (res !== undefined) {
            let data = res.data
            form.resetFields()
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            setTimeout(() => window.location.reload(), 1000)
          }
        })
    }
  }

  const onLogOut = () => {
    localStorage.clear()
    props.history.push('/back')
  }

  const LogIn =
    <Form
      form={form} name="horizontal_login"
      layout="inline" onFinish={onLogIn}
    >
      <Form.Item name="username">
        <Input style={{width: "6vw"}} prefix={<UserOutlined/>}/>
      </Form.Item>
      <Form.Item name="password">
        <Input
          style={{width: "6vw"}}
          prefix={<LockOutlined/>}
          type="password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        <Button htmlType="submit">
          <CheckOutlined/>
        </Button>
      </Form.Item>
    </Form>

  const FrontLink = () =>
    <Button
      style={{color: "white"}}
      type="link"
      onClick={() => props.history.push('/front/article')}
    >back to front</Button>

  const LogOut = (
    <div>
      <FrontLink/>
      <Avatar
        style={{backgroundColor: "#141414", marginBottom: 4}}
        shape="square"
        size="small"
        icon={<UserOutlined/>}
      />
      <Space>
        <span style={{color: "white"}}>{username}</span>
        <Button
          style={{color: "white"}}
          type="link"
          onClick={onLogOut}
        >Log out</Button>
      </Space>
    </div>
  )


  const LoginLink =
    <div>
      <FrontLink/>
      <Button
        style={{color: "white"}}
        type="link"
        onClick={() => setLoginClicked(true)}
      >Log in</Button>
    </div>


  if (hasLogin) return LogOut

  return loginClicked ? LogIn : LoginLink
}