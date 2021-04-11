import React from "react"
import Navigator from "./Navigator"
import {Col, Row} from "antd"
import {Route} from "react-router-dom"
import Article from "./Article"
import ArticleList from "./ArticleList"


export default class FrontPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <Navigator/>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={6}>
            <Route exact path="/" component={ArticleList}/>
            <Route path="/article" component={Article}/>
            <Route path="/about" component={ArticleList}/>
          </Col>
        </Row>
      </div>
    )
  }
}