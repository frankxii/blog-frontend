import React from 'react'
import {Route, Switch} from "react-router-dom"
import {Layout, Row, Col} from "antd"

import Welcome from "../front/Welcome"
import Siderbar from "./Siderbar"
import ArticleList from "./blog/ArticleList"
import CategoryList from "./blog/CategoryList"
import ArticleEditor from "./blog/ArticleEditor"
import GroupList from "./system/GroupList"
import UserList from "./system/UserList"
import Login from "../../component/Login"
import SiteLogo from "../../component/SiteLogo"

const {Content, Sider} = Layout
export default function BackPage(props: any) {
  return (
    <div>
      <Row align={"middle"} style={{
        height: 48,
        backgroundColor: '#141414',
        display:"flex",
        justifyContent:"space-between"
      }}>
        <Col offset={1}>
          <SiteLogo theme={"white"}/>
        </Col>
        <Col style={{marginRight:"3vw"}}>
          <Login/>
        </Col>
      </Row>
      <Layout>
        <Sider><Route path={`${props.match.path}`} component={Siderbar}/></Sider>
        <Content style={{paddingLeft: "2vw", paddingTop: 24, paddingRight: "1vh"}}>
          <Switch>
            <Route exact path={`${props.match.path}`} component={Welcome}/>
            {/*权限相关*/}
            <Route path={`${props.match.path}/system/user`} component={UserList}/>
            <Route path={`${props.match.path}/system/group`} component={GroupList}/>
            {/*文章相关*/}
            <Route exact path={`${props.match.path}/blog/article`} component={ArticleList}/>
            <Route path={`${props.match.path}/blog/category`} component={CategoryList}/>
            <Route path={`${props.match.path}/blog/addArticle`} component={ArticleEditor}/>
            <Route path={`${props.match.path}/blog/editArticle/:id`} component={ArticleEditor}/>
          </Switch>
        </Content>
      </Layout>
    </div>
  )
}