import {Button, Form, Input, message} from "antd"
import React, {useEffect} from "react"
import request from "../request"
import {api} from "../api"

export default function AddUser(props: { show: boolean }) {
  let show = props.show

  const [form] = Form.useForm()

  function onFinish(value: { username: string, password: string }) {

    request(api.addUser, value)
      .then((res: any) => {
        message.success(res.msg).then()
        form.resetFields()
      })
  }

  // eslint-disable-next-line
  useEffect(() => form.resetFields, [show])

  if (show) {

    return (
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="username" rules={[{required: true, message: 'username不能为空'}]}>
          <Input placeholder="username"/>

        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: 'password不能为空'}]}>
          <Input
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >保存</Button>
        </Form.Item>
      </Form>
    )
  } else {
    return (<span/>)
  }
}