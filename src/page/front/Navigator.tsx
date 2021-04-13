import React from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import {MenuInfo} from "rc-menu/lib/interface"

export default class Navigator extends React.Component<any, any> {

  state = {
    current: 'index'
  }

  handClick = (e: MenuInfo) => {
    console.log(e)
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