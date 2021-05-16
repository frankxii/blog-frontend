import React, {useEffect, useState} from 'react'
import {Card, Divider, Tag} from 'antd'
import {Link} from "react-router-dom"
import request from "../request"
import {frontBlogApi} from '../api'

export default function CategoryPendant() {
  const [categories, setCategories] = useState([{name: '', count: 0}])

  useEffect(() => {
    request(frontBlogApi.getArchive, {cate: 'category'})
      .then(res => {
        setCategories(res.data)
      })
  }, [])


  if (categories[0].name !== '') {
    return (
      <Card
        style={{width: 260, borderRadius: 8}}
      >
        <p style={{textAlign: 'center'}}>分类</p>
        <Divider/>
        {categories.map(category =>
          <Link
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin:5,
            }}
            to={`/front/category/${category.name}`}
            key={category.name}
          >
            <span>{category.name}</span>
            <Tag>{category.count}</Tag>
          </Link>
        )}
      </Card>
    )
  } else {
    return null
  }
}