import React, {useEffect, useRef, useState} from "react"
import {Table, Button, Space, Modal, Input} from "antd"
import request from "../../../request"
import {backBlogApi} from "../../../api"
import {Pagination} from "../../../interface"

export default function CategoryList() {
  // 分类列表数据
  const [categories, setCategories] = useState([{id: null, name: ''}])
  // 列表loading值
  const [listLoading, setListLoading] = useState(false)
  // 分页
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0
  })
  // 提交成功后刷新列表
  const [refresh, setRefresh] = useState(0)
  // 弹窗展示bool值
  const [isModalVisible, setIsModalVisible] = useState(false)
  // 弹窗内部属性，type:操作类型，id:类别id，name：类别名称
  const [modalProps, setModalProps] = useState({type: 'add', id: 0, name: ''})
  // 弹窗确定按钮loading bool值
  const [confirmLoading, setConfirmLoading] = useState(false)


  // 弹窗input组件引用
  const inputRef = useRef(null)
  // 表格列结构
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

  // 表格内操作区域的渲染函数
  function renderOperation(record: any) {
    if (record.id) {
      return (
        <Space>
          <Button
            size={"small"}
            onClick={() => showEditModal(record)}
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

  function showEditModal(record: any) {
    setModalProps({type: 'edit', id: record.id, name: record.name})
    setIsModalVisible(true)
  }

  // 弹窗确定-新增/编辑 处理回调
  function handleOk() {
    setConfirmLoading(true)
    let isAdd = modalProps.type === 'add'
    // 如果then抛出异常，则catch不处理
    // @ts-ignore
    let data = {id: modalProps.id, name: inputRef.current.state.value}

    request(isAdd ? backBlogApi.addCategory : backBlogApi.updateCategory, data)
      .then((res: any) => {
        if (res !== undefined) {
          setIsModalVisible(false)
          setRefresh(refresh + 1)
        }
      })
      .finally(() => setConfirmLoading(false))
  }

  // 删除分类
  function handleDelete(record: any) {
    request(backBlogApi.deleteCategory, {id: record.id})
      .then((res: any) => {
        if (res !== undefined) setRefresh(refresh + 1)
      })
  }

  // 刷新表格
  useEffect(() => {
    setListLoading(true)
    request(backBlogApi.getCategories, {uncategorized: false})
      .then(res => {
        if (res !== undefined) setCategories(res.data)
      })
      .finally(() => setListLoading(false))
  }, [refresh])

  // 每次弹窗关开启清理input的值
  useEffect(() => {
    if (isModalVisible) {
      // @ts-ignore
      inputRef.current.setState({value: ''})
    }
  }, [isModalVisible])

  return (
    <div>
      {/*新增按钮*/}
      <Button
        type={"primary"}
        style={{marginBottom: 10}}
        onClick={() => {
          setModalProps({type: 'add', id: 0, name: ''})
          setIsModalVisible(true)
        }}
      >新增</Button>
      <Table
        rowKey={(record) => `${record.id}`}
        dataSource={categories}
        columns={columns}
        loading={listLoading}
        pagination={pagination}
        onChange={(pagination: any) => setPagination(pagination)}
      />
      {/*模态弹窗组件，内含一个输入框*/}
      <Modal
        title={modalProps.type === 'add' ? '新增分类' : '编辑分类'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={confirmLoading}
      >
        <Input
          addonBefore='分类名称'
          allowClear={true}
          ref={inputRef}
          onPressEnter={handleOk}
        />
      </Modal>
    </div>
  )
}
