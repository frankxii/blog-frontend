import React, {useState, useEffect} from "react"

import {Menu} from "antd"
import {Link} from "react-router-dom"


export default function Navigator() {

  const [current, setCurrent] = useState("")

  const menuInfo = [
    {key: "front", link: "/front", text: "首页"},
    {key: "article", link: "/front/article", text: "文章"},
    {key: "records", link: "/front/records", text: "记录"},
    // {key: "about", link: "/front/about", text: "关于"},
    {key: "moods", link: "/front/moods", text: "说说"},
    {key: "leave", link: "/front/leave", text: "留言"},
    {key: "back", link: "/back", text: "后台"}
  ]

  useEffect(() => {
    // 取url斜杠后最后一个路由地址作为导航栏的高亮展示的key
    let url = window.location.pathname
    let key = url.split("/").pop()
    if (key) {
      if (['front', 'article', 'records', 'about', 'leave', 'back', 'moods'].includes(key)) {
        setCurrent(key)
      }
    }
  }, [])

  return (
    <Menu
      onClick={(e: any) => setCurrent(e.key)}
      mode={"horizontal"}
      selectedKeys={[current]}
      style={{borderBottomWidth: 0}}
    >
      {menuInfo.map(item =>
        <Menu.Item key={item.key}>
          <Link to={item.link}>{item.text}</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}