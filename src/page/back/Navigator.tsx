import React, {Component} from "react"
import {Menu, Row, Col} from "antd"
import {CustomerServiceOutlined} from "@ant-design/icons"

export default class Navigator extends Component<any, any> {
  render() {
    return (
      <Menu mode="horizontal" theme="dark" style={{height: 48, backgroundColor: "#141414"}}>
        <Row gutter={10}>
          <Col>
            <CustomerServiceOutlined style={{marginLeft: 30}}/>
          </Col>
          <Col>
            <p style={{color: "white"}}>frankxii's blog</p>
          </Col>
        </Row>

      </Menu>
    )
  }
}