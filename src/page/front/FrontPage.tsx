import React from "react"
import Navigator from "./Navigator"
import {Row, Col} from "antd"
import {Route} from "react-router-dom"
import Welcome from "./Welcome"
import ArticleList from "./ArticleList"
import Article from "./Article"
import About from "./About"

export default class FrontPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Row style={{marginBottom:50}}>
          <Col span={8} offset={8}>
            <Route path={`${this.props.match.path}`} component={Navigator}/>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={6}>
            <Route exact path={`${this.props.match.path}`} component={Welcome}/>
            <Route exact path={`${this.props.match.path}/article`} component={ArticleList}/>
            <Route path={`${this.props.match.path}/article/:id`} component={Article}/>
            <Route path={`${this.props.match.path}/about`} component={About}/>
          </Col>
        </Row>
      </div>
    )
  }
}