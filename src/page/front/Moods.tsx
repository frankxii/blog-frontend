import {Card, Divider, List} from "antd"

import {Mood} from "../../interface"
import {useMoodsList} from "../../hook"


export default function Moods() {

  const moods = useMoodsList()

  // 列表渲染
  const ListItem = (mood: Mood) =>
    <List.Item>
      <Card key={mood.id}>
        {mood.create_time}
        <Divider dashed={true} style={{margin: "1vh 0"}}/>
        {mood.content}
      </Card>
    </List.Item>

  // 如果没有数据，返回空白页面
  if (moods.length === 0) return null

  return (
    <List
      grid={{gutter: 16, column: 2}}
      pagination={{pageSize: 10}}
      dataSource={moods}
      renderItem={ListItem}
    />
  )
}