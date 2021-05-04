import React, {useEffect, useState} from 'react'
import {List, Space} from "antd"
import {Link} from "react-router-dom"
import {api} from "../../api"
import request from "../../request"
import ArticleTag from "../../component/ArticleTag"
import {FieldTimeOutlined, UnorderedListOutlined} from '@ant-design/icons'

interface Article {
  id: number,
  category_name: string,
  tags: number[],
  title: string,
  create_time: string,
  update_time: string
}


export default function ArticleList(props: any) {
  const [lists, setLists] = useState<Article[]>([])
  // 标签map
  const [tagMap, setTagMap] = useState<Map<number, string>>(new Map())
  const [loading, setLoading] = useState(false)

  useEffect(function getArticleLIst() {
    // 过滤条件，直接请求列表不过滤，按分类获取用category_name过滤
    let filter = {}
    let params = props.match.params
    if (params.hasOwnProperty('category_name')) {
      let category_name = params.category_name
      filter = {filter: 'category', category_name: category_name}
    }
    // 开启加载组件
    setLoading(true)
    // 获取博客文章列表
    request(api.getArticleList, filter).then((res: any) => {
      setLists(res.data.lists)
    }).finally(() => setLoading(false))

    // 设置导航高亮
    if (props.hasOwnProperty('setNavigatorKey')) {
      props.setNavigatorKey('article')
    }
  }, [props])

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
      renderItem={(item: any) => (
        <List.Item
          actions={[
            <Space>
              <UnorderedListOutlined/>
              {item.category_name}
              <FieldTimeOutlined/>
              {item.create_time}
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
              <Link to={`/blog/article/${item.id}`}>
                <p>{item.title}</p>
              </Link>
            }
            description={<ArticleTag tagIds={item.tags} tagMap={tagMap}/>}
          />
          "Ant Design, a design language for background applications, is refined by Ant UED Team"
          "Ant Design, a design language for background applications, is refined by Ant UED Team"
        </List.Item>
      )}
    />
  )
}