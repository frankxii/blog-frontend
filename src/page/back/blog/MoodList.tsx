import {useEffect, useState} from "react"
import {Button, Space, Table} from "antd"

import request from "../../../request"
import {backBlogApi} from "../../../api"
import {Mood} from "../../../interface"
import AddMood from "./AddMood"

export default function MoodList() {
  const [showAddMood, setShowAddMood] = useState<boolean>(false)
  const [currentMoodId, setCurrentMoodId] = useState<number>(0)
  const [moods, setMoods] = useState<Mood[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<number>(0)

  const columns = [
    {
      key: "mood is",
      title: "id",
      dataIndex: "id",
    }, {
      key: "content",
      title: "内容",
      dataIndex: "content"
    },
    {
      key: "create_time",
      title: "创建时间",
      dataIndex: "create_time"
    }, {
      key: "private",
      title: "是否可见",
      dataIndex: "is_visible",
      render: (record: Mood) => record.is_visible ? "否" : "是"
    }, {
      key: "operation",
      title: "操作",
      render: renderOperation
    }
  ]


  useEffect(function getMoodList() {
    setLoading(true)
    request(backBlogApi.getMoods)
      .then((res: any) => {
        if (res !== undefined) {
          setMoods(res.data)
        }
      })
      .finally(() => setLoading(false))
  }, [refresh])

  function renderOperation(record: Mood) {
    return (
      <div>
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setShowAddMood(true)
              setCurrentMoodId(record.id)
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            danger={true}
            onClick={() => deleteMood(record.id)}
          >
            删除
          </Button>

        </Space>
      </div>)
  }

  function deleteMood(moodId: number) {
    request(backBlogApi.deleteMood, {id: moodId})
      .then((res: any) => {
        if (res !== undefined) {
          setRefresh(refresh + 1)
        }
      })
  }

  return (
    <div>
      <Button type="primary" onClick={() => {
        setShowAddMood(!showAddMood)
        setCurrentMoodId(0)
      }}>
        {showAddMood ? "收起" : "新增"}
      </Button>
      <AddMood
        showProps={[showAddMood,setShowAddMood]}
        refreshProps={[refresh, setRefresh]}
        moodIdProps={[currentMoodId, setCurrentMoodId]}
      />

      <Table
        rowKey={record => `mood${record.id}`}
        style={{marginTop: 10}}
        dataSource={moods}
        columns={columns}
        loading={loading}
      />

    </div>
  )
}