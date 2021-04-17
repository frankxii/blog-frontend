import React, {Component} from "react"
import {Card} from "antd"

export default class ArticleList extends Component<any, any> {
  render() {
    return (
      <Card
        title="default size card"
        type="inner"
      >
        <p>content</p>
      </Card>
    )
  }
}