import React from 'react'
import {Card, Divider} from 'antd'
import {Link} from "react-router-dom"

export default function CategoryPendant(props: any) {

  return (
    <Card
      style={{width: 200, borderRadius: 8}}
    >
      <p style={{textAlign: 'center'}}>分类</p>
      <Divider/>
      <Link to='/blog'>
        <p>Ⅰ 生活随笔~~~~~7</p>
      </Link>
      <Link to='/blog'>
        <p>Ⅱ 生活随笔~~~~~8</p>
      </Link>
      <Link to='/blog'>
        <p>Ⅳ 生活~~~~~~~~6</p>
      </Link>
      <Link to='/blog'>
        <p>Ⅲ 生活随笔~~~~~9</p>
      </Link>
    </Card>
  )
}