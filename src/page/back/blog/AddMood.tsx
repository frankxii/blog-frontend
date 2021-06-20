import {useEffect, useState, CSSProperties} from "react"
import {Button, Form, Input, Space} from "antd"

import MDEditor from "@uiw/react-md-editor"

import request from "../../../request"
import {backBlogApi} from "../../../api"


export default function AddMood(props: {
  showProps: Array<any>,
  refreshProps: Array<any>,
  moodIdProps: Array<any>
}) {
  const {TextArea} = Input
  const [form] = Form.useForm()
  const [show, setShow] = props.showProps
  const [refresh, setRefresh] = props.refreshProps
  const [currentMoodId, setCurrentMoodId] = props.moodIdProps

  // 监听textarea的值，然后渲染用户侧的展示
  const [preview, setPreview] = useState("")

  const EditAreaStyle: CSSProperties = {
    width: "30vw",
    marginTop: "3vh",
    fontSize: 14
  }

  function onFinish(formData: { textarea: string }) {
    if (formData.textarea) {
      let api = currentMoodId === 0 ? backBlogApi.addMood : backBlogApi.updateMood
      request(api, {content: formData.textarea, id: currentMoodId})
        .then((res: any) => {
          if (res !== undefined) {
            setRefresh(refresh + 1)
            form.resetFields()
            setCurrentMoodId(0)
            setShow(false)
          }
        })
    }
  }


  useEffect(function resetForm() {
      if (show) {
        form.resetFields()
      }
    },
    // eslint-disable-next-line
    [show]
  )

  useEffect(() => {
    if (currentMoodId > 0) {
      request(backBlogApi.getMoodDetail, {id: currentMoodId})
        .then(res => {
          form.setFieldsValue({textarea: res.data.content})
        })
    }
  }, [currentMoodId, form])


  if (show) {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        onChange={(event: any) => setPreview(event.target.value)}
      >
        <Space align="start" size="large">
          <Form.Item name="textarea">
            <TextArea
              style={EditAreaStyle}
              autoSize={{minRows: 4}}
              maxLength={120} showCount/>
          </Form.Item>
          <MDEditor.Markdown
            source={preview}
            style={EditAreaStyle}
          />
        </Space>
        <Form.Item>
          <Button htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    )
  } else {
    return null
  }
}