import {Button, Form, Input} from "antd"
import React, {useEffect} from "react"
import request from "../../../request"
import {backSystemApi} from "../../../api"

export default function AddUser(
  props: { show: boolean, refreshProp: Array<any> }
) {
  let show = props.show
  const [refresh, setRefresh] = props.refreshProp

  const [form] = Form.useForm()

  function onFinish(value: { username: string, password: string }) {

    request(backSystemApi.addUser, value)
      .then((res: any) => {
        if (res !== undefined) {
          form.resetFields()
          setRefresh(refresh + 1)
        }
      })
  }


  useEffect(() => {
      if (show) form.resetFields()
    },
    // eslint-disable-next-line
    [show])

  if (show) {
    return (
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="username" rules={[{required: true, message: '用户名不能为空'}]}>
          <Input placeholder="用户名"/>

        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: '密码不能为空'}]}>
          <Input
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
          >保存</Button>
        </Form.Item>
      </Form>
    )
  } else {
    return null
  }
}