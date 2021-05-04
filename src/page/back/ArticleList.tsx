import React, {useEffect, useState} from "react"
import {Table, Button, Space, message} from "antd"
import request from "../../request"
import {api} from "../../api"
import ArticleTag from "../../component/ArticleTag"


export default function ArticleList(props: any) {
  // 文章列表数据源
  const [articleList, setArticleList] = useState([{id: null, title: ""}])
  // 刷新标识，当数据变动时，刷新列表
  const [refresh, setRefresh] = useState(0)
  // 列表loading特性开关
  const [loading, setLoading] = useState(false)
  // 每页列表的条数
  const [pageSize, setPageSize] = useState(5)
  // 当前分页数
  const [current, setCurrent] = useState(1)
  // 列表总条数
  const [total, setTotal] = useState(0)

  // 标签map
  const [tagMap, setTagMap] = useState<Map<number, string>>(new Map())

  // 列表设置
  const columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
      width: 150,
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title",
      width: 300,
    },
    {
      key: "category_name",
      title: "分类",
      dataIndex: "category_name",
      width: 200
    },
    {
      key: "tags",
      title: "标签",
      dataIndex: "tags",
      width: 300,
      render: (tagIds: number[]) => <ArticleTag tagIds={tagIds} tagMap={tagMap}/>
    },
    {
      key: "create_time",
      title: "创建时间",
      dataIndex: "create_time",
      width: 200
    },
    {
      key: "update_time",
      title: "更新时间",
      dataIndex: "update_time",
      width: 200
    },
    {
      key: "action",
      title: "操作",
      dataIndex: "id",
      width: 200,
      render: renderOperate
    }
  ]

  function renderOperate(id: number) {
    if (id) {
      return (
        <Space>
          <Button
            type="primary"
            size={"small"}
            // 点击编辑后，跳转路由到编辑
            onClick={() => props.history.push(`/backend/editArticle/${id}`)}
          >编辑
          </Button>
          <Button
            danger
            type="primary"
            size={"small"}
            onClick={() => handleDelete(id)}
          >删除
          </Button>
        </Space>
      )
    }
  }

  function handleDelete(id: number) {
    request(api.deleteArticle, {id: id})
      .then(() => {
        message.success('删除成功', 2).then()
        setRefresh(refresh + 1)
      })
  }

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
  }, [])

  useEffect(function constructor() {
    setLoading(true)
    request(api.getArticleList, {current: current, page_size: pageSize})
      .then(res => {
        let data = res.data
        setArticleList(data.lists)
        setCurrent(data.current)
        setPageSize(data.page_size)
        setTotal(data.total)
      })
      .finally(() => setLoading(false))
  }, [refresh, current, pageSize])

  // @ts-ignore
  return (
    <div>
      <Table
        //解决antd Table key缺失警告
        //https://www.jianshu.com/p/2e99e7c0b241?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
        rowKey={(record) => `${record.id}`}
        dataSource={articleList}
        columns={columns}
        loading={loading}

        pagination={{
          // @ts-ignore
          pageSize: pageSize, current: current, total: total, onChange: setCurrent
        }}
      />
    </div>
  )
}
