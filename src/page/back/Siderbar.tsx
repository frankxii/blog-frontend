import React, {useState} from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"

const {SubMenu} = Menu

export default function Siderbar(props: any) {
  const [selectedKey, setSelectedKey] = useState('')

  return (
    <Menu
      style={{width: 208, height: "100vh"}}
      defaultOpenKeys={["auth", "articles"]}
      selectedKeys={[selectedKey]}
      mode="inline"
      // 切换高亮tab
      onClick={event => setSelectedKey(event.key.toString())}
    >
      <SubMenu key="auth" title="权限管理">
        <Menu.Item key='userList'>
          <Link to={`${props.match.path}/user`}>用户管理</Link>
        </Menu.Item>
        <Menu.Item key='groupList'>
          <Link to={`${props.match.path}/group`}>权限组</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="articles" title="文章编辑">
        {/*<Menu.Item key="addArticle">*/}
        {/*  <Link to={`${props.match.path}/addArticle`}>新建文章</Link>*/}
        {/*</Menu.Item>*/}
        <Menu.Item key='articleList'>
          <Link to={`${props.match.path}/article`}>文章列表</Link>
        </Menu.Item>
        <Menu.Item key='category'>
          <Link to={`${props.match.path}/category`}>分类管理</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}
