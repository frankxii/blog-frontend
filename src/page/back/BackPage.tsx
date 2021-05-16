import React from 'react'
import {Route, Switch} from "react-router-dom"
import {Menu} from "antd"
import {Layout, Row, Col} from "antd"
import {CustomerServiceOutlined} from "@ant-design/icons"

import Welcome from "../front/Welcome"
import Siderbar from "./Siderbar"
import ArticleList from "./blog/ArticleList"
import CategoryList from "./blog/CategoryList"
import ArticleEditor from "./blog/ArticleEditor"
import GroupList from "./system/GroupList"
import UserList from "./system/UserList"
import Login from "../../component/Login"

const {Header, Content, Sider} = Layout
export default function BackPage(props: any) {
  return (
    <div>
      <Layout>
        <Header style={{height: 48, backgroundColor: "#141414"}}>
          <Row align={"middle"} wrap={false}>
            <Col>
              <Menu
                theme="dark"
                style={{backgroundColor: "#141414", width: 200}}>
                <Menu.Item
                  onClick={() => {
                    props.history.push("/front")
                  }}
                  icon={<CustomerServiceOutlined/>}>
                  frankxii's blog
                </Menu.Item>
              </Menu>
            </Col>
            <Col offset={14}>
              <Login/>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider><Route path={`${props.match.path}`} component={Siderbar}/></Sider>
          <Content style={{paddingLeft:"2vw",paddingTop:24,paddingRight:"1vh"}}>
            <Switch>
              <Route exact path={`${props.match.path}`} component={Welcome}/>
              {/*权限相关*/}
              <Route path={`${props.match.path}/system/user`} component={UserList}/>
              <Route path={`${props.match.path}/system/group`} component={GroupList}/>
              {/*文章相关*/}
              <Route exact path={`${props.match.path}/blog/article`} component={ArticleList}/>
              {/*<Route path={`${props.match.path}/blog/article/:id`} component={About}/>*/}
              <Route path={`${props.match.path}/blog/category`} component={CategoryList}/>
              <Route path={`${props.match.path}/blog/addArticle`} component={ArticleEditor}/>
              <Route path={`${props.match.path}/blog/editArticle/:id`} component={ArticleEditor}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}