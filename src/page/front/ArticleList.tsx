import React, {useEffect, useState} from 'react'

import {Link} from "react-router-dom"
import {List, Space} from "antd"
import {EyeOutlined, FieldTimeOutlined, UnorderedListOutlined} from '@ant-design/icons'

import {frontBlogApi} from "../../api"
import request from "../../request"
import {Article} from "../../interface"
import {useTagMap} from "../../hook"
import ArticleTag from "../../component/ArticleTag"

export default function ArticleList(props: any) {
  const [lists, setLists] = useState<Article[]>([])
  const width = window.outerWidth
  const tagMap = useTagMap()
  const [loading, setLoading] = useState(false)

  useEffect(function getArticleLIst() {
    let filters: any = {}
    let params = props.match.params
    if (params.hasOwnProperty('category_name')) {
      filters = {category_name: params.category_name}
    }
    if (params.hasOwnProperty('tag_name')) {
      filters = {tag_name: params.tag_name}
    }
    if (params.hasOwnProperty('month')) {
      filters = {month: params.month}
    }
    // 开启加载组件
    setLoading(true)
    // 获取博客文章列表
    request(frontBlogApi.getArticles, {filters: filters})
      .then((res: any) => {
        if (res !== undefined) {
          let data = res.data
          setLists(data.lists)
        }
      }).finally(() => setLoading(false))
  }, [props])

  return (
    <List
      size='large'
      itemLayout="vertical"
      dataSource={lists}
      loading={loading}
      pagination={{pageSize: 5}}
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
            width < 1000 ? null :
              <img
                width={width * 0.14}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />}
        >
          <List.Item.Meta
            title={
              <Link to={`/front/article/${article.id}`}>
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