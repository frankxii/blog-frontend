import React from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"

export default class Navigator extends React.Component<any, any> {
  render() {
    return (
      <Menu mode={"horizontal"} selectedKeys={["index"]}>
        <Menu.Item/>
        <Menu.Item key="index"><Link to={`${this.props.match.path}`}>首页</Link></Menu.Item>
        <Menu.Item key="article"><Link to={`${this.props.match.path}/article`}>文章</Link></Menu.Item>
        <Menu.Item><Link to={`${this.props.match.path}/guidang`}>归档</Link></Menu.Item>
        <Menu.Item><Link to={`${this.props.match.path}/about`}>关于</Link></Menu.Item>
        <Menu.Item><Link to={`${this.props.match.path}/leave`}>留言</Link></Menu.Item>
        <Menu.Item><Link to="/backend">后台</Link></Menu.Item>
      </Menu>
    )
  }
}