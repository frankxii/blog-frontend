import React, {Component} from "react"
import axios from "axios"
import {Table} from "antd"


export default class ArticleList extends Component<any, any> {
  state = {
    articleList: [{id: null, title: ""}]
  }

  componentDidMount() {
    axios.get("/blog/articleList")
      .then(r => {
        console.log(r.data)
        if (r.data.ret === 0) {
          this.setState({articleList: r.data.data.lists})
        }
      })
  }

  render() {
    return (

      <div>
        <Table dataSource={this.state.articleList}>
          <Table.Column title="id" dataIndex="id"/>
          <Table.Column title="标题" dataIndex="title"/>
        </Table>
        <Table dataSource={this.state.articleList}>
          <Table.Column title="id" dataIndex="id"/>
          <Table.Column title="标题" dataIndex="title"/>
        </Table>
      </div>
    )
  }
}