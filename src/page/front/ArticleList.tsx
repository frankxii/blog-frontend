import React, {useEffect, useState} from 'react'
import {List} from "antd"
import {Link} from "react-router-dom"
import {api} from "../../api"
import request from "../../request"

export default function ArticleList(props: any) {

  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 开启加载组件
    setLoading(true)
    // 获取博客文章列表
    request(api.getArticleList).then((res: any) => {
      setLists(res.data.lists)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <List
      size='large'
      itemLayout="horizontal"
      dataSource={lists}
      loading={loading}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            title={
              <Link to={`${props.match.url}/${item.id}`}>
                <p>{item.title}</p>
              </Link>
            }
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}