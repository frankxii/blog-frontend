import {Space, Tag} from "antd"
import React from "react"

interface TagProps {
  tagIds: number[]
  tagMap: Map<number, string>,
}

export default function ArticleTag(props: TagProps) {
  const {tagMap, tagIds} = props


  // 标签字典和有属性值时才渲染
  if (tagMap && tagIds) {
    let tagNameList: string[] = []
    // 从map里通过id取出对应的name，组合成string[]
    for (let tagId of tagIds) {
      tagNameList.push(tagMap.get(tagId) as string)
    }
    return (
      <Space>
        {tagNameList.map((tagName: string) =>
          <Tag key={tagName} color="geekblue">{tagName}</Tag>)}
      </Space>
    )
  } else {
    return null
  }
}

