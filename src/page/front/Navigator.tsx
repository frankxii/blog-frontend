import React from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import {MenuInfo} from "rc-menu/lib/interface"

export default class Navigator extends React.Component<any, any> {

  state = {
    current: ""
  }

  componentDidMount() {
    // 取url斜杠后最后一个路由地址作为导航栏的高亮展示的key
    let url = window.location.pathname
    this.setState({current: url.split("/").pop()})
  }

  handClick = (e: MenuInfo) => {
    this.setState({current: e.key})
  }

  render() {
    const {current} = this.state
    return (
      <Menu
        onClick={this.handClick}
        mode={"horizontal"}
        selectedKeys={[current]}
      >
        <Menu.Item/>
        <Menu.Item key="index"><Link to={`${this.props.match.path}`}>首页</Link></Menu.Item>
        <Menu.Item key="article"><Link to={`${this.props.match.path}/article`}>文章</Link></Menu.Item>
        <Menu.Item key="guidang"><Link to={`${this.props.match.path}/guidang`}>归档</Link></Menu.Item>
        <Menu.Item key="about"><Link to={`${this.props.match.path}/about`}>关于</Link></Menu.Item>
        <Menu.Item key="leave"><Link to={`${this.props.match.path}/leave`}>留言</Link></Menu.Item>
        <Menu.Item key="backend"><Link to="/backend">后台</Link></Menu.Item>
      </Menu>
    )
  }
}