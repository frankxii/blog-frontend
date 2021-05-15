import {Button, Form, Input, message} from "antd"
import React, {useEffect} from "react"
import request from "../../../request"
import {api} from "../../../api"

export default function AddUser(
  props: { show: boolean, refreshProp: Array<any> }
) {
  let show = props.show
  const [refresh, setRefresh] = props.refreshProp

  const [form] = Form.useForm()

  function onFinish(value: { username: string, password: string }) {

    request(api.addUser, value)
      .then((res: any) => {
        message.success(res.msg).then()
        form.resetFields()
        setRefresh(refresh + 1)
      })
  }


  useEffect(() => {
      if (!show) form.resetFields()
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