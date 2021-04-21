import React, {useEffect, useState} from "react"
import axios from "axios"
import {Table, Button, Space, message} from "antd"


export default function ArticleList(props: any) {
  const [articleList, setArticleList] = useState([{id: null, title: ""}])
  const [refresh, setRefresh] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(5)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)

  const columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
      width: 300,
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title",
      width: 300,
    },
    {
      key: "action",
      title: "操作",
      width: 200,
      render: renderOperate
    }
  ]

  function renderOperate(record: any) {
    if (record.id) {
      return (
        <Space>
          <Button
            type="primary"
            size={"small"}
            // 点击编辑后，跳转路由到编辑
            onClick={() => props.history.push(`/backend/editArticle/${record.id}`)}
          >编辑
          </Button>
          <Button
            danger
            type="primary"
            size={"small"}
            onClick={() => handleDelete(record)}
          >删除
          </Button>
        </Space>
      )
    }
  }

  function handleDelete(record: any) {
    axios.delete('/blog/article', {data: {id: record.id}})
      .then(r => {
        if (r.data.ret === 0) {
          message.success('删除成功', 2).then()
          setRefresh(refresh + 1)
        } else {
          message.error(r.data.msg, 2).then()
        }
      })
  }

  useEffect(() => {
    setLoading(true)
    axios.get("/blog/articleList", {params: {current: current, page_size: pageSize}})
      .then(r => {
        // console.log(r.data)
        if (r.data.ret === 0) {
          let data = r.data.data
          setArticleList(data.lists)
          setCurrent(data.current)
          setPageSize(data.page_size)
          setTotal(data.total)
        }
      })
      .finally(() => setLoading(false)
      )
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
