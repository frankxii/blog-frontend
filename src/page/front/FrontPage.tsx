import React from "react"
import Navigator from "./Navigator"
import {Col, Row} from "antd"
import {Route} from "react-router-dom"
import Welcome from "./Welcome"
import ArticleList from "./ArticleList"
import About from "./About"

export default class FrontPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <Route path={`${this.props.match.path}`} component={Navigator}/>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={6}>
            <Route exact path={`${this.props.match.path}`} component={Welcome}/>
            <Route path={`${this.props.match.path}/article`} component={ArticleList}/>
            <Route path={`${this.props.match.path}/about`} component={About}/>
          </Col>
        </Row>
      </div>
    )
  }
}