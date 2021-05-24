import React, {useEffect, useState} from 'react'
import {Card, Divider, Tag} from 'antd'
import {Link} from "react-router-dom"
import request from "../request"
import {frontBlogApi} from '../api'

// 分类和日期挂件
export default function CommonPendant(props: { cate: string }) {
  const [records, setRecords] = useState([{text: '', count: 0}])

  useEffect(() => {
    let data
    data = props.cate === 'category' ? {cate: 'category'} : {cate: 'month'}
    request(frontBlogApi.getArchive, data)
      .then(res => {
        if (res !== undefined) setRecords(res.data)
      })
  }, [props.cate])

  let title: string = props.cate === 'category' ? '分类' : '日期'

  function textToMonth(text: string) {
    text = text.replace('年', '-')
    text = text.replace('月', '')
    return text
  }

  if (records && records[0].text !== '') {
    return (
      <Card
        style={{width: 260}}
      >
        <p style={{textAlign: 'center'}}>{title}</p>
        <Divider/>
        {records.map(record =>
          <Link
            className="category-item"
            to={props.cate === 'category' ?
              `/front/category/${record.text}` :
              textToMonth(`/front/month/${record.text}`)
            }
            key={record.text}
          >
            <span>{record.text}</span>
            <Tag style={{border: "none", fontSize: 14}}>{record.count}</Tag>
          </Link>
        )}
      </Card>
    )
  } else {
    return null
  }
}