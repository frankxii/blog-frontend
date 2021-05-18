import React, {useEffect, useRef, useState} from "react"
import MDEditor from '@uiw/react-md-editor'

import {Input, Divider, Button, message, Select, Space} from "antd"
import {Row, Col} from "antd"

import {backBlogApi} from "../../../api"
import request from "../../../request"
import {SelectorOption} from "../../../interface"
import {useTagList} from "../../../hook"


export default function ArticleEditor(props: any) {

  // 文章id
  const [id, setId] = useState(0)
  // 文章内容
  const [value, setValue] = useState('')
  // 标题输入框引用
  const inputRef = useRef(null)
  // 分类下拉列表
  const [categories, setCategories] = useState([{id: 0, name: ''}])
  // 当前选择分类
  const [category, setCategory] = useState<SelectorOption>({value: 0, text: '未分类'})
  // 标签列表
  const tagList = useTagList()

  // 当前选择标签
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const {Option} = Select


  // 获取分类
  useEffect(function getCategories() {
    request(backBlogApi.getCategories).then(res => {
      if (res !== undefined) setCategories(res.data)
    })
  }, [props])


  // 填充编辑器
  useEffect(function initEditor() {
    let id = props.match.params.id
    // 如果路由带id，说明是编辑，请求文章详情填充编辑器
    if (id !== undefined) {
      request(backBlogApi.getArticle, {id: id})
        .then(res => {
          if (res !== undefined) {
            let article = res.data
            // 填充标题、文章内容、分类、标签
            // @ts-ignore
            inputRef.current.state.value = article.title
            setValue(article.body)
            setId(id)
            setCategory({value: article.category_id, text: article.category_name})
            setSelectedTags(article.tags)
          }
        })
    } else {
      // 清空标题、内容，主要应用场景为编辑后跳转新建页面
      // @ts-ignore
      inputRef.current.setValue('')
      setValue('')
    }
  }, [props])


  // 新增或修改文章
  function saveArticle() {
    if (inputRef) {
      // 非空校验
      // @ts-ignore
      const title = inputRef.current.state.value
      if (title === undefined || value === '') {
        message.warning('标题和内容不得为空', 2).then()
        return
      }
      // 创建或修改文章
      request(id === 0 ? backBlogApi.addArticle : backBlogApi.updateArticle,
        {id: id, title: title, body: value, category_id: category.value, tags: selectedTags}
      ).then((res: any) => {
        if (res !== undefined && 'data' in res) {
          setId(res.data.id)
        }
      })
    }
  }


  return (
    <div>
      <Row gutter={20}>
        {/*标题输入框*/}
        <Col span={8}>
          <Input ref={inputRef} addonBefore="标题"/>
        </Col>
        {/*类别*/}
        <Col>
          <label>分类：</label>
          <Select
            // @ts-ignore
            value={category.text}
            style={{width: 120}}
            // 修改类别id
            onChange={(text: string, option: any) =>
              setCategory({value: parseInt(option.key.split('category')[1]), text: text})
            }
          >
            {categories.map(category =>
              <Option key={'category' + category.id}
                      value={category.name}>{category.name}
              </Option>)}
          </Select>
        </Col>
        {/*标签*/}
        <Col span={6}>
          <label>标签：</label>
          <Select
            mode="tags"
            style={{width: '80%'}}
            // @ts-ignore
            value={selectedTags}
            // @ts-ignore
            onChange={(keys: number[]) => setSelectedTags(keys)}
          >
            {tagList.map(tag => <Option key={tag.text} value={tag.text}>{tag.text}</Option>)}
          </Select>
        </Col>
        {/*保存按钮*/}
        <Col>
          <Space>
            <Button onClick={() => props.history.push('/back/blog/article')}>返回</Button>
            <Button type={"primary"} onClick={saveArticle}>保存</Button>
          </Space>
        </Col>
      </Row>
      <Divider/>
      <MDEditor
        value={value}
        // @ts-ignore
        onChange={setValue}
        height={770}
      />
    </div>
  )
}