import React, {Component} from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"

const {SubMenu} = Menu

export default class Siderbar extends Component<any, any> {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Menu
        style={{width: 200, height: "100vh"}}
        defaultOpenKeys={["articles"]}
        mode="inline"
      >
        <SubMenu key="articles" title="文章编辑">
          <Menu.Item key="articleList">
            <Link to={`${this.props.match.path}/articleList`}>文章列表</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`${this.props.match.path}/article`}>文章列表</Link>
          </Menu.Item>

        </SubMenu>
      </Menu>
    )
  }

}