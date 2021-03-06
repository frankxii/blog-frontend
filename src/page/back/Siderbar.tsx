import React, {useEffect, useState} from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import request from "../../request"
import {backSystemApi} from "../../api"
import {MySubMenu} from "../../interface"

const {SubMenu} = Menu

export default function Siderbar(props: any) {
  const [selectedKey, setSelectedKey] = useState('')
  const [menu, setMenu] = useState<MySubMenu[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      request(backSystemApi.getMenu)
        .then(res => {
          if (res !== undefined) setMenu(res.data)
        })
    }
  }, [])

  return (
    <Menu
      defaultOpenKeys={["system", "blog"]}
      selectedKeys={[selectedKey]}
      mode="inline"
      // 切换高亮tab
      onClick={event => setSelectedKey(event.key.toString())}
    >
      {
        menu.map(submenu =>
          <SubMenu key={submenu.key} title={submenu.title}>
            {submenu.children.map(item =>
              <Menu.Item key={item.key}>
                <Link to={`${props.match.path}${item.link}`}>{item.title}</Link>
              </Menu.Item>)}
          </SubMenu>)
      }
    </Menu>
  )
}
