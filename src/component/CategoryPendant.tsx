import React, {useEffect, useState} from 'react'
import {Card, Divider} from 'antd'
import {Link} from "react-router-dom"
import request from "../request"
import {frontBlogApi} from '../api'

export default function CategoryPendant() {
  const [categories, setCategories] = useState([{name: '', count: 0}])
  const roman_numbers = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ']
  let index = 0

  useEffect(() => {
    request(frontBlogApi.getArchive, {cate: 'category'})
      .then(res => {
        setCategories(res.data)
      })
  }, [])

  function getCategoryText(cate_name: string, count: number) {
    // 获取对应罗马数字
    let roman_number = roman_numbers[index]
    let character_total = 4
    character_total -= (cate_name.length - 4)
    character_total = Math.floor(character_total)
    // 如果count多一位，字符就少一位
    character_total -= count.toString().length - 1
    // 为了排版，加入一个1/3空格
    // https://segmentfault.com/a/1190000022353208

    let character = new Array(character_total + 1).join('+-')
    // 生成一条分类text后，罗马数字索引+1
    index += 1
    return roman_number + '. +' + cate_name + character + '\u2004' + count.toString()
  }

  if (categories[0].name !== '') {
    return (
      <Card
        style={{width: 232, borderRadius: 8}}
      >
        <p style={{textAlign: 'center'}}>分类</p>
        <Divider/>

        {categories.map(category =>
          <Link
            to={`/front/category/${category.name}`}
            key={category.name}
          >
            <p>{getCategoryText(category.name, category.count)}</p>
          </Link>
        )}

      </Card>
    )
  } else {
    return (<span/>)
  }
}