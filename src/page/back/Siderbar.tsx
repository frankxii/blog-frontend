import React from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"

const {SubMenu} = Menu

export default function Siderbar(props: any) {
  return (
    <Menu
      style={{width: 208, height: "100vh"}}
      defaultOpenKeys={["articles"]}
      mode="inline"
    >
      <SubMenu key="articles" title="文章编辑">
        <Menu.Item key="articleList">
          <Link to={`${props.match.path}/article`}>文章列表</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`${props.match.path}/category`}>分类管理</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}
