import {Space, Tag} from "antd"

export default function ArticleTag(props: any) {
  const tagList = props.tagList
  return (
    <Space>
      {tagList.map((tagName: string) => <Tag key={tagName} color="blue">{tagName}</Tag>)}
    </Space>
  )
}