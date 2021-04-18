import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom"
import {Table, Button, Space, Modal, Input} from "antd"
import axios from "axios"

export default function Category() {
  const [categories, setCategories] = useState([{id: 0, name: ''}])
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [modalTitle, setModalTitle] = useState('新增分类')
  const [modalProps, setModalProps] = useState({type: 'add', id: 0, name: ''})
  const [inputValue, setInputValue] = useState('')
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
    setModalProps({type: 'edit', id: record.id, name: record.name})
    setIsModalVisible(true)
  }


  function handleOk(event: any) {
    console.log(modalProps.id, modalProps.type)
    console.log(inputValue)
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
      <Button
        type={"primary"}
        onClick={() => {
          setModalProps({type: 'add', id: 0, name: ''})
          setIsModalVisible(true)
        }}
      >新增</Button>
      <Table
        rowKey={(record) => `${record.id}`}
        dataSource={categories}
        columns={columns}
      />
      <Modal
        title={modalProps.type === 'add' ? '新增分类' : '编辑分类'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          addonBefore='分类名称'
          allowClear={true}
          onChange={event => setInputValue(event.target.value)}
        />
      </Modal>
    </div>
  )
}
