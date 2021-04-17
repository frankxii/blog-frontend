import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom"
import {Menu} from "antd"
import {Layout} from "antd"
import {CustomerServiceOutlined} from "@ant-design/icons"

import About from "../front/About"
import Welcome from "../front/Welcome"
import Siderbar from "./Siderbar"
import ArticleList from "./ArticleList"

const {Header, Content, Sider} = Layout
export default class BackPage extends Component<any, any> {


  render() {
    return (
      <div>
        <Layout>
          <Header className="-header" style={{height: 64, backgroundColor: "#141414"}}>
            <Menu
              mode="horizontal" theme="dark"
              style={{backgroundColor: "#141414"}}>
              <Menu.Item icon={<CustomerServiceOutlined/>}>
                frankxii's blog
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider><Route path={`${this.props.match.path}`} component={Siderbar}/></Sider>
            <Content>
              <Switch>
                <Route exact path={`${this.props.match.path}`} component={Welcome}/>
                <Route path={`${this.props.match.path}/article`} component={About}/>
                <Route path={`${this.props.match.path}/articleList`} component={ArticleList}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}