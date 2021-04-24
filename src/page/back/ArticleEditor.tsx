import React, {useEffect, useRef, useState} from "react"
import MDEditor from '@uiw/react-md-editor'
import {Input, Divider, Button, message, Select} from "antd"
import {Row, Col} from "antd"
import axios from "axios"

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
  const [category, setCategory] = useState({id: 0, name: ''})
  const {Option} = Select

  // 填充编辑器
  useEffect(function constructor() {
    let id = props.match.params.id
    // 如果路由带id，说明是编辑，请求文章详情填充编辑器
    if (id !== undefined) {
      axios.get('/blog/article', {params: {id: id}})
        .then(r => {
          if (r.data.ret === 0) {
            let article = r.data.data
            setValue(article.body)
            // @ts-ignore
            inputRef.current.state.value = article.title
            setId(id)
            setCategory({id: article.category_id, name: article.category_name})
          }
        })
    } else {
      // 清空标题和内容，主要应用场景为编辑后跳转新建页面
      setValue('')
      setCategory({id: 0, name: ''})
      // @ts-ignore
      inputRef.current.setValue('')
    }
  }, [props])
  // 获取分类
  useEffect(function getCategories() {
    axios.get('/blog/categoryList')
      .then(response => {
        if (response.data.ret === 0) {
          let categories = response.data.data
          setCategories(categories)
          setCategory(categories[0])
        }
      })

  }, [])

  function saveArticle() {
    console.log(category)
    if (inputRef) {
      // @ts-ignore
      const title = inputRef.current.state.value
      if (title === undefined || value === '') {
        message.warning('标题和内容不得为空', 2).then()
        return
      }

      axios({
        url: '/blog/article',
        method: id === 0 ? 'post' : 'put',
        data: {id: id, title: title, body: value, category_id: category.id}
      })
        .then(r => {
          if (r.data.ret === 0) {
            message.success(id === 0 ? '创建成功' : '保存成功', 2).then()
            // 新建文章后会返回文章id，记录文章id以识别后面的修改
            if ('data' in r.data) {
              setId(r.data.data.id)
            }
          } else (
            message.error(r.data.msg, 2).then()
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