import React, {useEffect, useState} from 'react'
import {List, Space} from "antd"
import {Link} from "react-router-dom"
import {api} from "../../api"
import request from "../../request"
import ArticleTag from "../../component/ArticleTag"
import {EyeOutlined, FieldTimeOutlined, UnorderedListOutlined} from '@ant-design/icons'
import {Article} from "../../interface"


export default function ArticleList(props: any) {
  const [lists, setLists] = useState<Article[]>([])
  // 标签map
  const [tagMap, setTagMap] = useState<Map<number, string>>(new Map())

  // 每页列表的条数
  const [pageSize, setPageSize] = useState(5)
  // 当前分页数
  const [current, setCurrent] = useState(1)
  // 列表总条数
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)

  useEffect(function getArticleLIst() {

    let pagination = {current: current, page_size: pageSize}

    let filters: any = {}
    let params = props.match.params
    if (params.hasOwnProperty('category_name')) {
      filters = {category_name: params.category_name}
    }
    if (params.hasOwnProperty('tag_name')) {
      filters = {tag_name: params.tag_name}
    }
    // 开启加载组件
    setLoading(true)
    // 获取博客文章列表
    request(api.getArticleList, {pagination: pagination, filters: filters})
      .then((res: any) => {
        let data = res.data
        setLists(data.lists)
        setCurrent(data.current)
        setPageSize(data.page_size)
        setTotal(data.total)
      }).finally(() => setLoading(false))

    // 设置导航高亮
    if (props.hasOwnProperty('setNavigatorKey')) {
      props.setNavigatorKey('article')
    }
  }, [props, current, pageSize])

  // 获取标签map
  useEffect(function getTagMap() {
    request(api.getTagMap)
      .then(res => {
        let tempTagMap = new Map<number, string>()
        // object to map
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            tempTagMap.set(Number(key), res.data[key])
          }
        }
        setTagMap(tempTagMap)
      })
  }, [props])


  return (
    <List
      size='large'
      itemLayout="vertical"
      dataSource={lists}
      loading={loading}
      pagination={{
        // @ts-ignore
        pageSize: pageSize, current: current, total: total, onChange: setCurrent
      }}
      renderItem={(article: Article) => (
        <List.Item
          actions={[
            <Space>
              <UnorderedListOutlined/>
              {article.category_name}
              <EyeOutlined/>
              {article.visit}
              <FieldTimeOutlined/>
              {article.create_time}
            </Space>
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            title={
              <Link to={`/blog/article/${article.id}`}>
                <p>{article.title}</p>
              </Link>
            }
            description={<ArticleTag tagIds={article.tags} tagMap={tagMap}/>}
          />
          {article.excerpt}...
        </List.Item>
      )}
    />
  )
}