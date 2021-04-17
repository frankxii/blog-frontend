import React, {Component} from "react"
import axios from "axios"
import {Table, Button, Space} from "antd"
import {Link} from "react-router-dom"


export default class ArticleList extends Component<any, any> {
  state = {
    articleList: [{id: null, title: ""}],
    show: true
  }

  columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
      render: (id: bigint) => <Link to={`${this.props.match.url}/${id}`}>{id}</Link>
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title"
    },
    {
      key: "action",
      title: "操作",
      width: 200,
      render: (record: any) => (
        <Space>
          <Button
            type="primary"
            size={"small"}
            onClick={() => this.handleDelete(record)}
            disabled={!this.state.show}
          >编辑
          </Button>
          <Button
            danger
            type="primary"
            size={"small"}
            onClick={() => this.handleDelete(record)}
            disabled={!this.state.show}
          >删除
          </Button>
        </Space>
      )
    }
  ]

  handleDelete(record: any) {
    // console.log(record)
    this.setState({show: !this.state.show})
  }

  componentDidMount() {
    axios.get("/blog/articleList")
      .then(r => {
        // console.log(r.data)
        if (r.data.ret === 0) {
          this.setState({articleList: r.data.data.lists})
        }
      })
  }

  render() {
    return (
      <div>
        <Table
          //解决antd Table key缺失警告
          //https://www.jianshu.com/p/2e99e7c0b241?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
          rowKey={(record) => `${record.id}`}
          dataSource={this.state.articleList}
          columns={this.columns}
        />
      </div>
    )
  }
}
