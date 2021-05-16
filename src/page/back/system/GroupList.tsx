import {useEffect, useState} from "react"
import {Button, message, Space, Table} from "antd"
import AddGroup from "./AddGroup"
import request from "../../../request"
import {backSystemApi} from "../../../api"

import {Group} from "../../../interface"
import MemberModal from "./MemberModal"
import AuthorityModal from "./AuthorityModal"

export default function GroupList() {
  // 新建权限组 组件开关
  const [showAddGroup, setShowAddGroup] = useState<boolean>(false)

  // 权限组列表相关
  const [groupList, setGroupList] = useState<Group[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<number>(0)

  // 操作按钮相关
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false)
  const [showAuthorityModal, setShowAuthorityModal] = useState<boolean>(false)
  const [currentGroupId, setCurrentGroupId] = useState<number>(0)

  const columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "id"
    },
    {
      key: "name",
      title: "名称",
      dataIndex: "name"
    },
    {
      key: "operation",
      title: "操作",
      render: renderOperation
    }
  ]

  // 操作区域渲染函数
  function renderOperation(record: any) {
    if (record.id) {
      return (
        <div>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setCurrentGroupId(record.id)
                setShowMemberModal(true)
              }}
            >成员维护</Button>
            <Button
              type="primary"
              onClick={() => {
                setCurrentGroupId(record.id)
                setShowAuthorityModal(true)
              }}
            >权限设置</Button>
            <Button
              type="primary"
              danger={true}
              onClick={() => deleteGroup(record.id)}
            >删除</Button>
          </Space>
        </div>
      )
    } else {
      return <span/>
    }
  }

  function deleteGroup(id: number) {
    request(backSystemApi.deleteGroup, {id: id})
      .then((res: any) => {
        message.success(res.msg).then()
        setRefresh(refresh + 1)
      })
  }

  useEffect(function getGroupList() {
    setLoading(true)
    request(backSystemApi.getGroups)
      .then((res: any) => {
        setGroupList(res.data)
      })
      .finally(() => setLoading(false))
  }, [refresh])

  return (
    <div>
      <Button
        type="primary"
        style={{marginBottom: 10}}
        onClick={() => setShowAddGroup(!showAddGroup)}
      >
        {showAddGroup ? "收起" : "新增"}
      </Button>
      <AddGroup show={showAddGroup} freshProp={[refresh, setRefresh]}/>
      <Table
        style={{marginTop: 10}}
        loading={loading}
        dataSource={groupList}
        columns={columns}
      />
      <MemberModal visibleProp={[showMemberModal, setShowMemberModal]} currentGroupId={currentGroupId}/>
      <AuthorityModal visibleProp={[showAuthorityModal, setShowAuthorityModal]} currentGroupId={currentGroupId}/>
    </div>)
}