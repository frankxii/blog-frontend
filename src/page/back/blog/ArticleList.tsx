import React, {useEffect, useState} from "react"
import {Table, Button, Space} from "antd"
import request from "../../../request"
import {backBlogApi} from "../../../api"
import ArticleTag from "../../../component/ArticleTag"
import {useCategoryList, useTagList, useTagMap} from "../../../hook"
import {Pagination} from "../../../interface"


export default function ArticleList(props: any) {
  // 文章列表数据源
  const [articleList, setArticleList] = useState([{id: null, title: ""}])
  // 刷新标识，当数据变动时，刷新列表
  const [refresh, setRefresh] = useState(0)
  // 列表loading特性开关
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const [filters, setFilters] = useState({
    category_ids: null,
    tag_ids: null
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
      width: "6vw",
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title",
      width: "15vw",
    },
    {
      key: "category_name",
      title: "分类",
      dataIndex: "category_name",
      width: "9vw",
      filters: categoryList
    },
    {
      key: "tags",
      title: "标签",
      dataIndex: "tags",
      width: "15vw",
      filters: TagList,
      render: (tagIds: number[]) => <ArticleTag tagIds={tagIds} tagMap={tagMap}/>
    }, {
      key: "visit",
      title: "访问数",
      dataIndex: "visit",
      width: "7vw"
    },
    {
      key: "create_time",
      title: "创建时间",
      dataIndex: "create_time",
      width: "10vw"
    },
    {
      key: "update_time",
      title: "更新时间",
      dataIndex: "update_time",
      width: "10vw"
    },
    {
      key: "action",
      title: "操作",
      dataIndex: "id",
      width: "10vw",
      render: renderOperate
    }
  ]

  function renderOperate(id: number) {
    if (id) {
      return (
        <Space>
          <Button
            size={"small"}
            // 点击编辑后，跳转路由到编辑
            onClick={() => props.history.push(`/back/blog/editArticle/${id}`)}
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
    request(backBlogApi.deleteArticle, {id: id})
      .then((res: any) => {
        if (res !== undefined) setRefresh(refresh + 1)
      })
  }


  useEffect(function getArticleLIst() {
    setLoading(true)
    request(backBlogApi.getArticles, {
      // pagination: {
      //   current: pagination.current,
      //   page_size: pagination.pageSize,
      // },
      filters: filters
    })
      .then(res => {
        if (res !== undefined) {
          let data = res.data
          setArticleList(data.lists)
          // 05-22 去掉后端分页，利用前端分页提高体验
          // setPagination({current: data.current, pageSize: data.page_size, total: data.total})
        }
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [refresh])

  function changePage(pagination: any, tFilters: any) {
    // 设置分页
    setPagination(pagination)
    // 转换当前filter数据
    let cate_filter = JSON.stringify(tFilters.category_name)
    let tag_filter = JSON.stringify(tFilters.tags)
    // 转换上一次的filter数据
    let old_cate_filter = JSON.stringify(filters.category_ids)
    let old_tag_filter = JSON.stringify(filters.tag_ids)
    // 当filter数据有变化时才执行
    if (cate_filter !== old_cate_filter || tag_filter !== old_tag_filter) {
      // 重置分页
      setPagination({current: 1, pageSize: 1, total: 0})
      // 设置filter
      setFilters({category_ids: tFilters.category_name, tag_ids: tFilters.tags})
      // 刷新页面
      setRefresh(refresh + 1)
    }
  }


  return (
    <div>
      <Button
        type={'primary'}
        style={{marginBottom: 10}}
        onClick={() => props.history.push('/back/blog/addArticle')}
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
