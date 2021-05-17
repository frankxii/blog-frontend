import {useEffect, useState} from "react"

import {Card, List} from "antd"

import request from "../../request"
import {frontBlogApi} from "../../api"
import {Record} from "../../interface"

export default function Records(props: { setNavigatorKey: CallableFunction }) {
  const [records, setRecords] = useState<Record[]>([])


  useEffect(function getRecords() {
    request(frontBlogApi.getRecords)
      .then(res => {
        setRecords(res.data)
        props.setNavigatorKey('records')
      })
    // eslint-disable-next-line
  }, [])

  return (
    <List
      grid={{gutter: 16, column: 4}}
      dataSource={records}
      renderItem={(record: Record) => (
        <List.Item>
          <Card title={record.datetime}>{record.event}</Card>
        </List.Item>
      )}
    />)
}