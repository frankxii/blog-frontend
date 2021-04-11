import React from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"

export default class Navigator extends React.Component<any, any> {
  render() {
    return (
        <Menu mode={"horizontal"} selectedKeys={["index"]}>
          <Menu.Item/>
          <Menu.Item key="index"><Link to="/">首页</Link></Menu.Item>
          <Menu.Item key="article"><Link to="/article">文章</Link></Menu.Item>
          <Menu.Item><Link to="/guidang">归档</Link></Menu.Item>
          <Menu.Item><Link to="/about">关于</Link></Menu.Item>
          <Menu.Item><Link to="/leave">留言</Link></Menu.Item>
          <Menu.Item><a href="http://www.baidu.com">后台</a></Menu.Item>
        </Menu>
    )
  }
}