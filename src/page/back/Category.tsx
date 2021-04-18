import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom"
import {Table, Button, Space} from "antd"

export default function Category() {
  const [categories, setCategories] = useState([{id: 0, name: 'null'}])
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
      render: (record: any) => (
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
  ]

  function handleDelete(record: any) {

  }


  useEffect(() => {
    setCategories([{id: 1, name: 'frank'}])
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
