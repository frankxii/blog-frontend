import React from 'react'
import {Route, Switch} from "react-router-dom"
import {Menu} from "antd"
import {Layout, Row, Col} from "antd"
import {CustomerServiceOutlined} from "@ant-design/icons"

import About from "../front/About"
import Welcome from "../front/Welcome"
import Siderbar from "./Siderbar"
import ArticleList from "./ArticleList"
import Category from "./Category"
import ArticleEditor from "./ArticleEditor"
import GroupList from "./GroupList"
import UserList from "./UserList"

const {Header, Content, Sider} = Layout
export default function BackPage(props: any) {
  return (
    <div>
      <Layout>
        <Header style={{height: 48, backgroundColor: "#141414"}}>
          <Row>
            <Col>
              <Menu
                theme="dark"
                style={{backgroundColor: "#141414", width: 200}}>
                <Menu.Item
                  onClick={() => {
                    props.history.push("/blog")
                  }}
                  icon={<CustomerServiceOutlined/>}>
                  frankxii's blog
                </Menu.Item>
              </Menu>
            </Col>
            <Col>
              {/*<Menu>*/}
              {/*  <Menu.Item*/}
              {/*    icon={<CustomerServiceOutlined/>}>*/}
              {/*    frankxii's blog*/}
              {/*  </Menu.Item>*/}
              {/*</Menu>*/}
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider><Route path={`${props.match.path}`} component={Siderbar}/></Sider>
          <Content style={{padding: 24}}>
            <Switch>
              <Route exact path={`${props.match.path}`} component={Welcome}/>
              {/*权限相关*/}
              <Route path={`${props.match.path}/user`} component={UserList}/>
              <Route path={`${props.match.path}/group`} component={GroupList}/>
              {/*文章相关*/}
              <Route exact path={`${props.match.path}/article`} component={ArticleList}/>
              <Route path={`${props.match.path}/article/:id`} component={About}/>
              <Route path={`${props.match.path}/category`} component={Category}/>
              <Route path={`${props.match.path}/addArticle`} component={ArticleEditor}/>
              <Route path={`${props.match.path}/editArticle/:id`} component={ArticleEditor}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}