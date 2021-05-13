import React, {useEffect, useState} from "react"
import {Table, Button, Space, message} from "antd"
import request from "../../../request"
import {api} from "../../../api"
import ArticleTag from "../../../component/ArticleTag"
import {useCategoryList, useTagList, useTagMap} from "../../../hook"


export default function ArticleList(props: any) {
  // 文章列表数据源
  const [articleList, setArticleList] = useState([{id: null, title: ""}])
  // 刷新标识，当数据变动时，刷新列表
  const [refresh, setRefresh] = useState(0)
  // 列表loading特性开关
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0
  })

  const [filters, setFilters] = useState({
    category_ids: [],
    tag_ids: []
  })

  // 标签map
  const tagMap = useTagMap()
  const categoryList = useCategoryList()
  const TagList = useTagList()

  // 列表设置
  const columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
      width: 150,
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title",
      width: 300,
    },
    {
      key: "category_name",
      title: "分类",
      dataIndex: "category_name",
      width: 200,
      filters: categoryList
    },
    {
      key: "tags",
      title: "标签",
      dataIndex: "tags",
      width: 300,
      filters: TagList,
      render: (tagIds: number[]) => <ArticleTag tagIds={tagIds} tagMap={tagMap}/>
    }, {
      key: "visit",
      title: "访问数",
      dataIndex: "visit",
      width: 150
    },
    {
      key: "create_time",
      title: "创建时间",
      dataIndex: "create_time",
      width: 200
    },
    {
      key: "update_time",
      title: "更新时间",
      dataIndex: "update_time",
      width: 200
    },
    {
      key: "action",
      title: "操作",
      dataIndex: "id",
      width: 200,
      render: renderOperate
    }
  ]

  function renderOperate(id: number) {
    if (id) {
      return (
        <Space>
          <Button
            type="primary"
            size={"small"}
            // 点击编辑后，跳转路由到编辑
            onClick={() => props.history.push(`/backend/editArticle/${id}`)}
          >编辑
          </Button>
          <Button
            danger
            type="primary"
            size={"small"}
            onClick={() => handleDelete(id)}
          >删除
          </Button>
        </Space>
      )
    }
  }

  function handleDelete(id: number) {
    request(api.deleteArticle, {id: id})
      .then(() => {
        message.success('删除成功', 2).then()
        setRefresh(refresh + 1)
      })
  }


  useEffect(function getArticleLIst() {
    setLoading(true)
    request(api.getArticleList, {
      pagination: {
        current: pagination.current,
        page_size: pagination.pageSize,
      },
      filters: filters
    })
      .then(res => {
        let data = res.data
        setArticleList(data.lists)
        setPagination({current: data.current, pageSize: data.page_size, total: data.total})
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [refresh])

  function changePage(pagination: any, filters: any) {
    setPagination(pagination)
    setFilters({category_ids: filters.category_name, tag_ids: filters.tags})
    setRefresh(refresh + 1)
  }


  return (
    <div>
      <Button
        type={'primary'}
        style={{marginBottom: 10}}
        onClick={() => props.history.push('/backend/addArticle')}
      >新增</Button>
      <Table
        //解决antd Table key缺失警告
        //https://www.jianshu.com/p/2e99e7c0b241?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
        rowKey={(record) => `${record.id}`}
        dataSource={articleList}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onChange={changePage}
      />
    </div>
  )
}
