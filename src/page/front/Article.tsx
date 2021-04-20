import React, {useEffect, useState} from "react"
import axios from "axios"
import MDEditor from "@uiw/react-md-editor"


export default function Article(props: any) {
// 博客正文页组件
  const [article, setArticle] = useState({title: "", body: ""})

  useEffect(() => {
    let id = props.match.params.id
    axios({
      method: "get",
      url: "/blog/article",
      params: {
        id: id
      }
    }).then(response => {
      if (response.data.ret === 0) {
        setArticle(response.data.data)
      }
    })
  }, [props])

  return (
    <div>
      <p>{article.title}</p>
      <MDEditor.Markdown>{article.body}</MDEditor.Markdown>
    </div>
  )
}