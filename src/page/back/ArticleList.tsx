import React, {useEffect, useState} from "react"
import axios from "axios"
import {Table, Button, Space} from "antd"
import {Link} from "react-router-dom"


export default function ArticleList(props: any) {
  const [articleList, setArticleList] = useState([{id: null, title: ""}])
  const [show, setShow] = useState(true)

  const columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
      width: 300,
      render: (id: bigint) => <Link to={`${props.match.url}/${id}`}>{id}</Link>
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
            onClick={() => handleDelete(record)}
            disabled={!show}
          >编辑
          </Button>
          <Button
            danger
            type="primary"
            size={"small"}
            onClick={() => handleDelete(record)}
            disabled={!show}
          >删除
          </Button>
        </Space>
      )
    }
  }


  function handleDelete(record: any) {
    setShow(!show)
  }

  useEffect(() => {
    axios.get("/blog/articleList")
      .then(r => {
        // console.log(r.data)
        if (r.data.ret === 0) {
          setArticleList(r.data.data.lists)
        }
      })
  }, [])

  return (
    <div>
      <Table
        //解决antd Table key缺失警告
        //https://www.jianshu.com/p/2e99e7c0b241?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
        rowKey={(record) => `${record.id}`}
        dataSource={articleList}
        columns={columns}
      />
    </div>
  )
}
