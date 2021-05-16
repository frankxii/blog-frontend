import {Card, Divider, Space} from "antd"
import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import request from "../request"
import {frontBlogApi} from "../api"


export default function TagCloudPendant() {

  const [tagList, setTagList] = useState([])

  useEffect(function getTagArchive() {
    request(frontBlogApi.getArchive, {'cate': 'tag'})
      .then(res => setTagList(res.data))
  }, [])

  return (
    <Card
      style={{width: 232, borderRadius: 8}}
    >
      <p style={{textAlign: 'center'}}>标签</p>
      <Divider/>
      <Space wrap>
        {/*tag:[name:string, count:number]*/}
        {tagList.map(tag =>
          <Link
            to={`/front/tag/${tag[0]}`}
            key={tag[0]}
          >
            {`${tag[0]}·${tag[1]}`}
          </Link>)}
      </Space>
    </Card>
  )
}