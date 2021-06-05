import React from "react"
import {Link} from "react-router-dom"

import {Card, Divider, Space, Tag} from "antd"

import {useTagArchive} from "../hook"


export default function TagCloudPendant() {
  const tagList = useTagArchive()

  const Tags = () =>
    <Space wrap>
      {/*tag:[name:string, count:number]*/}
      {tagList.map(tag =>
        <Link
          to={`/front/tag/${tag[0]}`}
          key={tag[0]}
        >
          <Tag color={"geekblue"}>{`${tag[0]}(${tag[1]})`}</Tag>
        </Link>)}
    </Space>

  return (
    <Card
      style={{width: 260}}
    >
      <p style={{textAlign: 'center'}}>标签</p>
      <Divider/>
      <Tags/>
    </Card>
  )
}