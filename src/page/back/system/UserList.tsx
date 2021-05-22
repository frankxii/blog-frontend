import {Button, Space, Table} from "antd"
import AddUser from "./AddUser"
import {useEffect, useState} from "react"
import request from "../../../request"
import {backSystemApi} from "../../../api"

import {Pagination, User} from "../../../interface"

export default function UserList() {
  // 新增组件相关
  const [showAddUser, setShowAddUser] = useState<boolean>(false)

  // 列表相关
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [refresh, setRefresh] = useState<number>(0)

  const columns = [
    {
      key: "user id",
      title: "id",
      dataIndex: "id",
      width: 150
    },
    {
      key: "username",
      title: "用户名",
      dataIndex: "username",
      width: 200
    }, {
      key: "group",
      title: "权限组",
      width: 400
    },
    {
      key: "create_time",
      title: "创建时间",
      dataIndex: "create_time"
    }, {
      key: "last_login",
      title: "上次登录时间",
      dataIndex: "last_login"
    },
    {
      key: "operation",
      title: "操作",
      // dataIndex: "is_active",
      render: renderOperation
    }
  ]


  function renderOperation(record: User) {
    if (record.id) {
      return (
        <div>
          <Space>
            <Button
              size={"small"}
              danger={true}
            >{record.is_active ? "冻结" : "激活"}
            </Button>
            <Button
              type="primary"
              size={"small"}
              danger={true}
              onClick={() => deleteUser(record.id)}
            >
              删除
            </Button>
          </Space>
        </div>
      )
    }
  }


  useEffect(function getUserList() {
    setLoading(true)
    request(backSystemApi.getUsers)
      .then(res => {
        if (res !== undefined) setUserList(res.data)
      })
      .finally(() =>
        setLoading(false)
      )
  }, [refresh])

  function deleteUser(id: number) {
    request(backSystemApi.deleteUser, {id: id})
      .then((res: any) => {
        if (res !== undefined) setRefresh(refresh + 1)
      })
  }

  if (!userList) return null
  return (
    <div>
      <Button
        type={"primary"}
        style={{marginBottom: 10}}
        onClick={() => setShowAddUser(!showAddUser)}
      >{showAddUser ? '收起' : '新增'}
      </Button>
      <AddUser show={showAddUser} refreshProp={[refresh, setRefresh]}/>

      <Table
        rowKey={record => `user${record.id}`}
        style={{marginTop: 10}}
        loading={loading}
        dataSource={userList}
        columns={columns}
        pagination={pagination}
        onChange={(pageInfo: any) => setPagination(pageInfo)}
      />
    </div>)
}