import React from 'react'
import axios from 'axios'
import {List} from "antd"
import {Link} from "react-router-dom"


export default class ArticleList extends React.Component<any, any> {
  state = {
    lists: [],
    loading: false
  }

  render() {
    return (
      <List
        size='large'
        itemLayout="horizontal"
        dataSource={this.state.lists}
        loading={this.state.loading}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`${this.props.match.url}/${item.id}`}>
                  <p>{item.title}</p>
                </Link>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    )
  }

  componentDidMount() {
    // 开启加载组件
    this.setState({loading: true})
    // 获取博客文章列表
    axios({
      method: 'get',
      url: '/blog/articleList'
    }).then(response => {
      this.setState({lists: response.data.data.lists})
    }).finally(() =>
      this.setState({loading: false})
    )
  }
}