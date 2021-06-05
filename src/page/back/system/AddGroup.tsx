import {Button, Form, Input} from "antd"
import React, {useEffect} from "react"
import request from "../../../request"
import {backSystemApi} from "../../../api"

export default function AddGroup(props: { show: boolean, freshProp: Array<any> }) {
  const {show} = props
  const [refresh, setRefresh] = props.freshProp
  const [form] = Form.useForm()

  useEffect(() => {
      if (show) form.resetFields()
    },
    // eslint-disable-next-line
    [show])

  function onFinish(value: { groupName: string }) {
    request(backSystemApi.addGroup, {name: value.groupName})
      .then((res: any) => {
        if (res !== undefined) {
          form.resetFields()
          setRefresh(refresh + 1)
        }
      })
  }

  if (show) {
    return (
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="groupName" rules={[{required: true, message: "权限组名不得为空"}]}>
          <Input placeholder="权限组名"/>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
          >保存</Button>
        </Form.Item>
      </Form>
    )
  } else {
    return <span/>
  }
}