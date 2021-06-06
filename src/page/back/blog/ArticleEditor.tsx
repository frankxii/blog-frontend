import React, {useEffect, useState} from "react"

import MDEditor from '@uiw/react-md-editor'
import {Input, Divider, Button, message, Select, Space, Form} from "antd"
import {Row, Col} from "antd"
import {useForm} from "antd/es/form/Form"

import {backBlogApi} from "../../../api"
import request from "../../../request"
import {SelectorOption} from "../../../interface"
import {useCategoryList, useTagList} from "../../../hook"


export default function ArticleEditor(props: any) {

  // 文章id
  const [id, setId] = useState(props.match.params.id)

  // 文章内容
  const [content, setContent] = useState('')

  const [form] = useForm()
  // 分类下拉列表
  const categories = useCategoryList()
  // 当前选择分类
  const [category, setCategory] = useState<SelectorOption>({value: 0, text: '未分类'})

  // 标签列表
  const tagList = useTagList()
  // 当前选择标签
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const {Option} = Select

  // 填充编辑器
  useEffect(function initEditor() {
    // 如果路由带id，说明是编辑，请求文章详情填充编辑器
    if (id !== undefined) {
      request(backBlogApi.getArticle, {id: id})
        .then(res => {
          if (res !== undefined) {
            let article = res.data
            // 填充标题、文章内容、分类、标签
            form.setFieldsValue({title:article.title})
            setContent(article.body)
            setCategory({value: article.category_id, text: article.category_name})
            setSelectedTags(article.tags)
          }
        })
    }
  }, [id, form])


  // 新增或修改文章
  function saveArticle(data: { title: string }) {
    // 非空校验
    const title = data.title
    if (title === undefined || content === '') {
      message.warning('标题和内容不得为空', 2).then()
      return
    }
    // 创建或修改文章
    request(id === undefined ? backBlogApi.addArticle : backBlogApi.updateArticle,
      {
        id: id, title: title, body: content,
        category_id: category.value, tags: selectedTags
      }
    ).then((res: any) => {
      if (res !== undefined && 'data' in res) {
        setId(res.data.id)
      }
    })
  }


  const Title = () =>
    <Col>
      <Form.Item name={"title"}>
        <Input style={{width: "20vw"}} addonBefore="标题"/>
      </Form.Item>
    </Col>

  const Category = () =>
    <Col>
      <label>分类：</label>
      <Select
        style={{width: "10vw"}}
        value={category.text}
        // 修改类别id
        onChange={(text: string, option: any) =>
          setCategory({value: parseInt(option.key.split('category')[1]), text: text})
        }
      >
        {categories.map(category =>
          <Option key={'category' + category.value}
                  value={category.text}>{category.text}
          </Option>)}
      </Select>
    </Col>

  const Tags = () =>
    <Col>
      <label>标签：</label>
      <Select
        style={{width: "15vw"}}
        mode="tags"
        // @ts-ignore
        value={selectedTags}
        // @ts-ignore
        onChange={(keys: number[]) => setSelectedTags(keys)}
      >
        {tagList.map(tag => <Option key={tag.text} value={tag.text}>{tag.text}</Option>)}
      </Select>
    </Col>

  const Submit = () =>
    <Col>
      <Space>
        <Button onClick={() => props.history.push('/back/blog/article')}>返回</Button>
        <Button htmlType={"submit"}>保存</Button>
      </Space>
    </Col>

  return (
    <div>
      <Form
        layout={"inline"}
        form={form}
        onFinish={saveArticle}
      >
        <Row gutter={20} align={"middle"}>
          <Title/>
          <Category/>
          <Tags/>
          <Submit/>
        </Row>
      </Form>
      <Divider/>
      <MDEditor
        value={content}
        // @ts-ignore
        onChange={setContent}
        height={770}
      />
    </div>
  )
}