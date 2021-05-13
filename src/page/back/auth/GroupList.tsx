import {useEffect, useState} from "react"
import {Button, message, Table} from "antd"
import AddGroup from "./AddGroup"
import request from "../../../request"
import {api} from "../../../api"

import {Group} from "../../../interface"

export default function GroupList() {

  const [showAddGroup, setShowAddGroup] = useState<boolean>(false)

  const [groupList, setGroupList] = useState<Group[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<number>(0)

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
          <Button
            type="primary"
            danger={true}
            onClick={() => deleteGroup(record.id)}
          >删除</Button>
        </div>
      )
    } else {
      return <span/>
    }
  }

  function deleteGroup(id: number) {
    request(api.deleteGroup, {id: id})
      .then((res: any) => {
        message.success(res.msg).then()
        setRefresh(refresh + 1)
      })
  }

  useEffect(function getGroupList() {
    setLoading(true)
    request(api.getGroupList)
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
    </div>)
}