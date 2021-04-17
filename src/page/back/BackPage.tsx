import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom"
import {Menu} from "antd"
import {Layout, Row, Col} from "antd"
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
          <Header style={{height: 48, backgroundColor: "#141414"}}>
            <Row>
              <Col>
                <Menu
                  theme="dark"
                  style={{backgroundColor: "#141414", width: 200}}>
                  <Menu.Item
                    onClick={() => {
                      this.props.history.push("/blog")
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
            <Sider><Route path={`${this.props.match.path}`} component={Siderbar}/></Sider>
            <Content style={{padding: 24}}>
              <Switch>
                <Route exact path={`${this.props.match.path}`} component={Welcome}/>
                <Route exact path={`${this.props.match.path}/article`} component={ArticleList}/>
                <Route path={`${this.props.match.path}/article/:id`} component={About}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}