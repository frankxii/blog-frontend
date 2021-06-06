import {useEffect} from "react"
import {Button, Form, Input} from "antd"

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
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="textarea">
          <TextArea
            style={{width: "30vw", marginTop: "3vh"}}
            autoSize={{minRows: 4}}
            maxLength={120} showCount/>
        </Form.Item>
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