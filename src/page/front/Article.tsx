import React, {useEffect, useState} from "react"
import MDEditor from "@uiw/react-md-editor"
import {Typography} from "antd"
import {frontBlogApi} from "../../api"
import request from "../../request"

export default function Article(props: any) {
  // 博客正文页组件
  const [article, setArticle] = useState({title: "", body: ""})

  const {Title} = Typography

  const id = props.match.params.id

  useEffect(() => {
    request(frontBlogApi.getArticle, {id: id, _ref: 'front'})
      .then((res: any) => {
        if (res !== undefined) setArticle(res.data)
      })
  }, [id])

  return (
    <div>
      <Title level={2}>{article.title}</Title>
      <MDEditor.Markdown source={article.body}/>
    </div>
  )
}