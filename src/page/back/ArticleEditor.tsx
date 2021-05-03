import React, {useEffect, useRef, useState} from "react"
import MDEditor from '@uiw/react-md-editor'

import {Input, Divider, Button, message, Select} from "antd"
import {Row, Col} from "antd"

import {api} from "../../api"
import request from "../../request"

interface Category {
  id: number,
  name: string
}

interface Tag {
  id: number,
  name: string
}

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
  const [category, setCategory] = useState<Category>({id: 0, name: ''})
  // 标签列表
  const [tagList, setTagList] = useState<Tag[]>([])
  // 当前选择标签
  const [selectedTags, setSelectedTags] = useState<[string | number][]>([])
  const {Option} = Select


  // 获取分类
  useEffect(function getCategories() {
    request(api.getCategoryList).then(res => {
      let categories = res.data
      setCategories(categories)
      setCategory(categories[0])
    })
  }, [props])

  // 获取标签map
  useEffect(function getTagList() {
    setSelectedTags([])
    request(api.getTagMap)
      .then(res => {
        let tempTagList: Tag[] = []
        // @ts-ignore
        Object.keys(res.data).forEach(key => tempTagList.push({id: Number(key), name: res.data[key]}))
        setTagList(tempTagList)
      })
  }, [props])

  // 填充编辑器
  useEffect(function initEditor() {
    let id = props.match.params.id
    // 如果路由带id，说明是编辑，请求文章详情填充编辑器
    if (id !== undefined) {
      request(api.getArticle, {id: id})
        .then(res => {
          let article = res.data
          // 填充标题、文章内容、分类、标签
          // @ts-ignore
          inputRef.current.state.value = article.title
          setValue(article.body)
          setId(id)
          setCategory({id: article.category_id, name: article.category_name})
          setSelectedTags(article.tags)
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


  return (
    <div>
      <Row gutter={20}>
        {/*标题输入框*/}
        <Col span={8}>
          <Input ref={inputRef} addonBefore="标题"/>
        </Col>
        {/*类别*/}
        <Col>
          <Select
            // @ts-ignore
            value={category.name}
            style={{width: 120}}
            // 修改类别id
            onChange={(value: string, option: any) => setCategory({id: parseInt(option.key), name: value})}
          >
            {categories.map(category => <Option key={category.id} value={category.name}>{category.name}</Option>)}
          </Select>
        </Col>
        {/*标签*/}
        <Col span={5}>
          <Select
            mode="tags"
            style={{width: '100%'}}
            // @ts-ignore
            value={selectedTags}
            // @ts-ignore
            onChange={(keys: number | string[]) => setSelectedTags(keys)}
          >
            {tagList.map(tag => <Option key={tag.id} value={tag.id}>{tag.name}</Option>)}
          </Select>
        </Col>
        {/*保存按钮*/}
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