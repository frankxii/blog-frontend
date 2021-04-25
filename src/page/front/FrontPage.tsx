import React from "react"

import {Row, Col, Layout, Card} from "antd"
import {Content} from "antd/es/layout/layout"
import {CustomerServiceOutlined} from "@ant-design/icons"

import {Route} from "react-router-dom"

import About from "./About"
import Article from "./Article"
import ArticleList from "./ArticleList"
import Welcome from "./Welcome"
import Navigator from "./Navigator"
import CategoryPendant from "../../component/CategoryPendant"

export default function FrontPage(props: any) {
  return (
    <div>
      {/*导航栏*/}
      <Card style={{borderRadius: 8, width: '100%'}} bodyStyle={{padding: 0}}>
        <Row align="middle">
          <Col offset={6}>
            <div>
              <CustomerServiceOutlined/>
              <span style={{marginLeft: 10}}>frankxii's blog</span>
            </div>
          </Col>
          <Col span={12}>
            <Route path={`${props.match.path}`} component={Navigator}/>
          </Col>
        </Row>
      </Card>
      {/*content容器*/}
      <Layout>
        <Content style={{padding: '64px 50px', minHeight: 895, backgroundColor: '#FAFAFA'}}>
          <Row>
            {/*主要内容区域*/}
            <Col span={13} offset={4}>
              <Card style={{borderRadius: 8, minHeight: 200}}>
                <Route exact path={`${props.match.path}`} component={Welcome}/>
                <Route exact path={`${props.match.path}/article`} component={ArticleList}/>
                <Route path={`${props.match.path}/article/:id`} component={Article}/>
                <Route path={`${props.match.path}/about`} component={About}/>
              </Card>
            </Col>
            {/*分类挂件*/}
            <Col offset={1}>
              <CategoryPendant/>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}