import React, {useEffect, useState} from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import {MenuInfo} from "rc-menu/lib/interface"

export default function Navigator(props: any) {

  const [current, setCurrent] = useState("")

  function handClick(e: MenuInfo) {
    setCurrent(e.key.toString())
  }

  useEffect(() => {
    // 取url斜杠后最后一个路由地址作为导航栏的高亮展示的key
    let url = window.location.pathname
    let key = url.split("/").pop()
    if (key) {
      setCurrent(key)
    }
  }, [])


  return (
    <Menu
      onClick={handClick}
      mode={"horizontal"}
      selectedKeys={[current]}
      style={{borderBottomWidth: 0}}
    >
      <Menu.Item/>
      <Menu.Item key="index"><Link to={`${props.match.path}`}>首页</Link></Menu.Item>
      <Menu.Item key="article"><Link to={`${props.match.path}/article`}>文章</Link></Menu.Item>
      <Menu.Item key="guidang"><Link to={`${props.match.path}/guidang`}>归档</Link></Menu.Item>
      <Menu.Item key="about"><Link to={`${props.match.path}/about`}>关于</Link></Menu.Item>
      <Menu.Item key="leave"><Link to={`${props.match.path}/leave`}>留言</Link></Menu.Item>
      <Menu.Item key="backend"><Link to="/backend">后台</Link></Menu.Item>
    </Menu>
  )
}