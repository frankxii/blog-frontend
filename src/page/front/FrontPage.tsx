import React from "react"
import Navigator from "./Navigator"
import {Row, Col} from "antd"
import {Route} from "react-router-dom"
import Welcome from "./Welcome"
import ArticleList from "./ArticleList"
import Article from "./Article"
import About from "./About"
import {CustomerServiceOutlined} from "@ant-design/icons"

export default function FrontPage(props: any) {
  return (
    <div>
      <Row style={{marginBottom: 50}} align="middle">
        <Col offset={6}>
          <div>
            <CustomerServiceOutlined/>
            <span style={{marginLeft: 10}}>frankxii's blog</span>
          </div>
        </Col>
        <Col span={7}>
          <Route path={`${props.match.path}`} component={Navigator}/>
        </Col>
      </Row>
      <Row>
        <Col span={10} offset={6}>
          <Route exact path={`${props.match.path}`} component={Welcome}/>
          <Route exact path={`${props.match.path}/article`} component={ArticleList}/>
          <Route path={`${props.match.path}/article/:id`} component={Article}/>
          <Route path={`${props.match.path}/about`} component={About}/>
        </Col>
      </Row>
    </div>
  )
}