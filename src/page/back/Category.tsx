import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom"
import {Table, Button, Space} from "antd"
import axios from "axios"

export default function Category() {
  const [categories, setCategories] = useState([{id: 0, name: ''}])
  const columns = [
    {
      key: "id",
      title: "分类id",
      dataIndex: "id",
      // render: (id: bigint) => <Link to={`${this.props.match.url}/${id}`}>{id}</Link>
    },
    {
      key: "name",
      title: "分类名称",
      dataIndex: "name"
    },
    {
      key: "action",
      title: "操作",
      width: 200,
      render: renderOperation
    }
  ]

  function renderOperation(record: any) {
    if (record && record.id !== 0) {
      return (
        <Space>
          <Button
            type="primary"
            size={"small"}
            onClick={() => handleDelete(record)}
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

  }


  useEffect(() => {
    axios.get('/blog/categoryList')
      .then(r => {
        if (r.data.ret === 0) {
          setCategories(r.data.data)
        }
      })
  }, [])

  return (
    <div>
      <Table
        rowKey={(record) => `${record.id}`}
        dataSource={categories}
        columns={columns}
      />
    </div>
  )
}
