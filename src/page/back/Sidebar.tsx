import React, {Component} from 'react'
import {Menu} from "antd"

const {SubMenu} = Menu

export default class Sidebar extends Component<any, any> {
  render() {
    return (
      <Menu
        style={{width: 200, height: "100vh"}}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <SubMenu key="sub1" title="Nav1">
          <Menu.Item>tab1</Menu.Item>
          <Menu.Item>tab2</Menu.Item>
          <Menu.Item>tab3</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }

}