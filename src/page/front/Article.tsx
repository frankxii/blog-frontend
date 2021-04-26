import React, {useEffect, useState} from "react"
import MDEditor from "@uiw/react-md-editor"
import {api} from "../../api"
import request from "../../request"

export default function Article(props: any) {
// 博客正文页组件
  const [article, setArticle] = useState({title: "", body: ""})

  useEffect(() => {
    let id = props.match.params.id
    request(api.getArticle, {id: id}).then((res: any) => {
      setArticle(res.data)
    })
  }, [props])

  return (
    <div>
      <p>{article.title}</p>
      <MDEditor.Markdown>{article.body}</MDEditor.Markdown>
    </div>
  )
}