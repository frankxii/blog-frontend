import {Button, Table} from "antd"
import AddUser from "../../../component/AddUser"
import {useEffect, useState} from "react"
import request from "../../../request"
import {api} from "../../../api"

import {User} from "../../../interface"

export default function UserList() {
  // 新增组件相关
  const [showAddUser, setShowAddUser] = useState<boolean>(false)
  const [addButtonText, setAddButtonText] = useState<string>('新增')


  // 列表相关
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const columns = [
    {
      key: "id",
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
      render: renderActiveOperation
    }
  ]

  function renderActiveOperation(record: User) {
    if (record.id) {
      if (record.is_active) {
        return (
          <Button
            danger={true}
          >{record.is_active ? "冻结" : "激活"}
          </Button>)
      }
    }
  }

  // 新增按钮onclick
  function handleAddClick() {
    setShowAddUser(!showAddUser)
    setAddButtonText(showAddUser ? '新增' : '收起')
  }

  useEffect(function getUserList() {
    setLoading(true)
    request(api.getUserList)
      .then(res => {
        console.log(res)
        setUserList(res.data)
      })
      .finally(() =>
        setLoading(false)
      )
  }, [])

  return (
    <div>
      <Button
        type={"primary"}
        style={{marginBottom: 10}}
        onClick={handleAddClick}
      >{addButtonText}
      </Button>
      <AddUser show={showAddUser}/>

      <Table
        style={{marginTop: 10}}
        loading={loading}
        dataSource={userList}
        columns={columns}
      >

      </Table>
    </div>)
}