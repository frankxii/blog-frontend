import React, {useState, useEffect} from "react"
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
    // @ts-ignore
    if (key) {
      if (['blog', 'article', 'guidang', 'about', 'leave', 'backend'].includes(key)) {
        setCurrent(key)
      } else {
        // 如果路由里没有取到匹配的key，从父组件里面取key
        setCurrent(props.navigatorKey)
      }
    }
  }, [props])


  return (
    <Menu
      onClick={handClick}
      mode={"horizontal"}
      selectedKeys={[current]}
      style={{borderBottomWidth: 0}}
    >
      <Menu.Item/>
      <Menu.Item key="blog"><Link to={`${props.match.path}`}>首页</Link></Menu.Item>
      <Menu.Item key="article"><Link to={`${props.match.path}/article`}>文章</Link></Menu.Item>
      <Menu.Item key="guidang"><Link to={`${props.match.path}/guidang`}>归档</Link></Menu.Item>
      <Menu.Item key="about"><Link to={`${props.match.path}/about`}>关于</Link></Menu.Item>
      <Menu.Item key="leave"><Link to={`${props.match.path}/leave`}>留言</Link></Menu.Item>
      <Menu.Item key="back"><Link to="/back">后台</Link></Menu.Item>
    </Menu>
  )
}