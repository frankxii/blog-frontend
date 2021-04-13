import React from "react"
import axios from "axios"

class Article extends React.Component<any, any> {
// 博客正文页组件
  state = {
    title: "",
    body: ""
  }

  componentDidMount() {
    let id = this.props.match.params.id
    axios({
      method: "get",
      url: "/blog/article",
      params: {
        article_id: id
      }
    }).then(response => {
      if (response.data.ret === 0) {
        let data = response.data.data
        this.setState({title: data.title, body: data.body})
      }
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.title}</p>
        <p>{this.state.body}</p>
      </div>
    )
  }
}

export default Article