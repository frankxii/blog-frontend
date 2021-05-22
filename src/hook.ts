import {SelectorOption} from "./interface"
import {useEffect, useState} from "react"
import request from "./request"
import {frontBlogApi, backBlogApi} from "./api"

export function useTagList() {
  const [tagList, setTagList] = useState<SelectorOption[]>([])

  useEffect(() => {
    request(frontBlogApi.getTagMap)
      .then(res => {
        if (res !== undefined) {
          let tempTagList: SelectorOption[] = []
          Object.keys(res.data).forEach(key => tempTagList.push({value: Number(key), text: res.data[key]}))
          setTagList(tempTagList)
        }
      })
  }, [])

  return tagList
}

export function useTagMap() {
  // 标签map
  const [tagMap, setTagMap] = useState<Map<number, string>>(new Map())

  // 获取标签map
  useEffect(() => {
    request(frontBlogApi.getTagMap)
      .then(res => {
        if (res !== undefined) {
          let tempTagMap = new Map<number, string>()
          // object to map
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              tempTagMap.set(Number(key), res.data[key])
            }
          }
          setTagMap(tempTagMap)
        }
      })
  }, [])

  return tagMap
}

// 获取标签归档后的标签列表
export function useTagArchive() {
  const [tagList, setTagList] = useState([])

  useEffect(function getTagArchive() {
    request(frontBlogApi.getArchive, {'cate': 'tag'})
      .then(res => {
          if (res !== undefined) setTagList(res.data)
        }
      )
  }, [])
  return tagList
}

export function useCategoryList() {
  const [categoryList, setCategoryList] = useState<SelectorOption[]>([])

  useEffect(() => {
    request(backBlogApi.getCategories).then(res => {
      if (res !== undefined) {
        let tempList: SelectorOption[] = []
        res.data.forEach((item: { id: number, name: string }) => {
          tempList.push({value: item.id, text: item.name})
        })
        setCategoryList(tempList)
      }
    })
  }, [])

  return categoryList
}