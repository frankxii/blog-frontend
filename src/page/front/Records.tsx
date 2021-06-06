import {useEffect, useState} from "react"

import {Card, List} from "antd"

import request from "../../request"
import {frontBlogApi} from "../../api"
import {Record} from "../../interface"

export default function Records() {
  const [records, setRecords] = useState<Record[]>([])

  const width = window.outerWidth

  // 响应式调整记录列数
  let column = 2
  if (width > 1300) column = 3
  if (width > 1500) column = 4

  useEffect(function getRecords() {
    request(frontBlogApi.getRecords)
      .then(res => {
        if (res !== undefined) setRecords(res.data)
      })
  }, [])

  if (records.length === 0) return null
  return (
    <List
      grid={{gutter: 16, column: column}}
      dataSource={records}
      renderItem={(record: Record) => (
        <List.Item>
          <Card title={record.datetime}>{record.event}</Card>
        </List.Item>
      )}
    />)
}