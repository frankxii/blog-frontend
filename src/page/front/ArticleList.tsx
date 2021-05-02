import React, {useEffect, useState} from 'react'
import {List, Space, Tag} from "antd"
import {Link} from "react-router-dom"
import {api} from "../../api"
import request from "../../request"
import {FieldTimeOutlined, UnorderedListOutlined} from '@ant-design/icons'

export default function ArticleList(props: any) {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.hasOwnProperty('setNavigatorKey')) {
      props.setNavigatorKey('article')
    }

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
            description={<Space><Tag>123</Tag><Tag>123</Tag></Space>}
          />
          "Ant Design, a design language for background applications, is refined by Ant UED Team"
          "Ant Design, a design language for background applications, is refined by Ant UED Team"
        </List.Item>
      )}
    />
  )
}