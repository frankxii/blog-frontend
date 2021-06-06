import React, {useEffect, useRef, useState} from "react"
import MDEditor from '@uiw/react-md-editor'

import {Input, Divider, Button, message, Select, Space} from "antd"
import {Row, Col} from "antd"

import {backBlogApi} from "../../../api"
import request from "../../../request"
import {SelectorOption} from "../../../interface"
import {useCategoryList, useTagList} from "../../../hook"


export default function ArticleEditor(props: any) {

  // 文章id
  const [id, setId] = useState(0)
  // 文章内容
  const [value, setValue] = useState('')
  // 标题输入框引用
  const inputRef = useRef(null)
  // 分类下拉列表
  // const [categories, setCategories] = useState([{id: 0, name: ''}])
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
        {
          id: id, title: title, body: value,
          category_id: category.value, tags: selectedTags
        }
      ).then((res: any) => {
        if (res !== undefined && 'data' in res) {
          setId(res.data.id)
        }
      })
    }
  }

  const Title = () =>
    <Col>
      <Input style={{width: "20vw"}} ref={inputRef} addonBefore="标题"/>
    </Col>

  const Category = () =>
    <Col>
      <label>分类：</label>
      <Select
        style={{width: "10vw"}}
        // @ts-ignore
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
        <Button type={"primary"} onClick={saveArticle}>保存</Button>
      </Space>
    </Col>

  return (
    <div>
      <Row gutter={20} align={"middle"}>
        <Title/>
        <Category/>
        <Tags/>
        <Submit/>
      </Row>
      <Divider/>
      <MDEditor
        highlightEnable
        value={value}
        // @ts-ignore
        onChange={setValue}
        height={770}
      />
    </div>
  )
}