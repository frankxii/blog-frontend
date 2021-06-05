import React from 'react'
import {Route, Switch} from "react-router-dom"
import {Layout, Row, Col} from "antd"

import Siderbar from "./Siderbar"
import ArticleList from "./blog/ArticleList"
import CategoryList from "./blog/CategoryList"
import ArticleEditor from "./blog/ArticleEditor"
import GroupList from "./system/GroupList"
import UserList from "./system/UserList"
import Login from "../../component/Login"
import SiteLogo from "../../component/SiteLogo"
import BackIndex from "./BackIndex"
import MoodList from "./blog/MoodList"

const {Content, Sider} = Layout
export default function BackPage(props: any) {

  const routes = [
    {path: '', component: BackIndex, exact: true},
    {path: 'system/user', component: UserList},
    {path: 'system/group', component: GroupList},
    {path: 'blog/article', component: ArticleList, exact: true},
    {path: 'blog/category', component: CategoryList},
    {path: 'blog/mood', component: MoodList},
    {path: 'blog/addArticle', component: ArticleEditor},
    {path: 'blog/editArticle/:id', component: ArticleEditor}
  ]

  const Routes = () =>
    <Switch>
      {routes.map(route =>
        <Route
          key={route.path}
          exact={!!route.exact}
          path={`${props.match.path}/${route.path}`}
          component={route.component}
        />
      )}
    </Switch>

  const Header = () =>
    <Row align="middle" justify="space-between" style={{
      height: 48,
      backgroundColor: '#141414',
    }}>
      <Col offset={1}>
        <SiteLogo theme={"white"}/>
      </Col>
      <Col style={{marginRight: "3vw"}}>
        <Route path={`${props.match.path}`} component={Login}/>
      </Col>
    </Row>

  return (
    <div>
      <Header/>
      <Layout>
        <Sider
          style={{height: "94vh"}}
          theme={"light"}
          collapsible={true}
        >
          <Route
            path={`${props.match.path}`}
            component={Siderbar}
          />
        </Sider>
        <Content style={{
          paddingLeft: "2vw",
          width: "100vw",
          height: "94vh",
          paddingTop: "3vh",
          paddingRight: "1vh"
        }}>
          <Routes/>
        </Content>
      </Layout>
    </div>
  )
}
