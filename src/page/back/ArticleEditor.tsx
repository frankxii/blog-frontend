import React, {useEffect, useRef, useState} from "react"
import MDEditor from '@uiw/react-md-editor'
import {Input, Divider, Button, message, Select} from "antd"
import {Row, Col} from "antd"
import request from "../../request"
import {api} from "../../api"


export default function ArticleEditor(props: any) {

  // 文章内容
  const [value, setValue] = useState('')
  // 文章id
  const [id, setId] = useState(0)
  // 标题输入框引用
  const inputRef = useRef(null)
  // 分类下拉列表
  const [categories, setCategories] = useState([{id: 0, name: ''}])
  // 当前选择分类
  const [category, setCategory] = useState<{ id: number, name: string }>({id: 0, name: ''})

  // 标签
  const [tags, setTags] = useState<{ id: number, name: string }[]>([])
  const [selectedTags, setSelectedTags] = useState<[string | number][]>([])
  const {Option} = Select

  // 填充编辑器
  useEffect(function constructor() {
    let id = props.match.params.id
    // 如果路由带id，说明是编辑，请求文章详情填充编辑器
    if (id !== undefined) {
      request(api.getArticle, {id: id})
        .then(res => {
          let article = res.data
          setValue(article.body)
          // @ts-ignore
          inputRef.current.state.value = article.title
          setId(id)
          setCategory({id: article.category_id, name: article.category_name})
        })
    } else {
      // 清空标题、内容、分类、标签，主要应用场景为编辑后跳转新建页面
      setValue('')
      setCategory({id: 0, name: ''})
      setTags([])
      setSelectedTags([])
      // @ts-ignore
      inputRef.current.setValue('')
    }
  }, [props])
  // 获取分类
  useEffect(function getCategories() {
    request(api.getCategoryList).then(res => {
      let categories = res.data
      setCategories(categories)
      setCategory(categories[0])
    })
  }, [])

  // 新增或修改文章
  function saveArticle() {
    console.log(selectedTags)
    if (inputRef) {
      // 非空校验
      // @ts-ignore
      const title = inputRef.current.state.value
      if (title === undefined || value === '') {
        message.warning('标题和内容不得为空', 2).then()
        return
      }
      // 创建或修改文章
      request(id === 0 ? api.addArticle : api.updateArticle,
        {id: id, title: title, body: value, category_id: category.id, tags: selectedTags}
      ).then(res => {
        message.success(id === 0 ? '创建成功' : '保存成功', 2).then()
        if ('data' in res) {
          setId(res.data.id)
        }
      })
    }
  }

  // 每次标签变化会回调这个方法
  function tagOnChange(keys: [string | number][]) {
    let keysChecked: [string | number][] = []
    keys.forEach((key: any) => {
      // 如果输入的标签输入已有标签，用已有标签的id替换name
      if (typeof key === "string") {
        tags.forEach((tag) => {
          if (tag.name === key) key = tag.id
        })
      }
      keysChecked.push(key)
    })
    setSelectedTags(keysChecked)
  }


  return (
    <div>
      <Row gutter={20}>
        <Col span={8}>
          <Input ref={inputRef} addonBefore="标题"/>
        </Col>
        <Col>
          <Select
            // @ts-ignore
            value={category.name}
            style={{width: 120}}
            // 修改分类id
            onChange={(value: string, option: any) => setCategory({id: parseInt(option.key), name: value})}
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <Select
            mode="tags"
            style={{width: '100%'}}
            // @ts-ignore
            onChange={tagOnChange}
          >
            {tags.map((tag) => (<Option value={tag.id}>{tag.name}</Option>))}
          </Select>
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
    </div>
  )
}