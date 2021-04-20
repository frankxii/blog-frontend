import React, {useRef, useState} from "react"
import MDEditor from '@uiw/react-md-editor'
import {Input, Divider, Button, message} from "antd"
import {Row, Col} from "antd"
import axios from "axios"

export default function ArticleEditor(props: any) {

  const [value, setValue] = useState('# hello world')
  const [id, setId] = useState(0)
  const inputRef = useRef(null)


  function saveArticle() {
    if (inputRef) {
      // @ts-ignore
      const title = inputRef.current.state.value

      axios({
        url: '/blog/article',
        method: id === 0 ? 'post' : 'put',
        data: {id: id, title: title, body: value}
      })
        .then(r => {
          if (r.data.ret === 0) {
            message.success(id === 0 ? '创建成功' : '保存成功', 2).then()
            // 新建文章后会返回文章id，记录文章id以识别后面的修改
            if ('data' in r.data) {
              setId(r.data.data.id)
            }
          } else (
            message.error(r.data.msg).then()
          )
        })
    }
  }

  return (
    <div>
      <Row gutter={20}>
        <Col span={12}>
          <Input ref={inputRef} addonBefore="标题"/>
        </Col>
        <Col>
          <Button type={"primary"} onClick={saveArticle}>保存</Button>
        </Col>
      </Row>
      <Divider/>
      <MDEditor
        value={value}
        // @ts-ignore
        onChange={setValue}
        height={770}
      />
      {/*<MDEditor.Markdown source={value}/>*/}
    </div>
  )
}