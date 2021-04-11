import React from 'react'
import axios from 'axios'
import {List} from "antd"

interface AppProps {
}

interface AppState {
  lists: any
}

export default class ArticleList extends React.Component<AppProps, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {lists: []}
  }

  render() {
    return (
      <List
        size='large'
        itemLayout="horizontal"
        dataSource={this.state.lists}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={<p>{item.title}</p>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    )
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/blog/articleList'
    }).then((response) => {
      this.setState({lists: response.data.data.lists})
    })
  }
}