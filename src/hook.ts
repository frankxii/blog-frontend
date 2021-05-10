import {SelectorOption} from "./interface"
import {useEffect, useState} from "react"
import request from "./request"
import {api} from "./api"

export function useTagList() {
  const [tagList, setTagList] = useState<SelectorOption[]>([])

  useEffect(() => {
    request(api.getTagMap)
      .then(res => {
        let tempTagList: SelectorOption[] = []
        Object.keys(res.data).forEach(key => tempTagList.push({id: Number(key), name: res.data[key]}))
        setTagList(tempTagList)
      })
  }, [])

  return tagList
}

export function useTagMap() {
  // 标签map
  const [tagMap, setTagMap] = useState<Map<number, string>>(new Map())

  // 获取标签map
  useEffect(() => {
    request(api.getTagMap)
      .then(res => {
        let tempTagMap = new Map<number, string>()
        // object to map
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            tempTagMap.set(Number(key), res.data[key])
          }
        }
        setTagMap(tempTagMap)
      })
  }, [])

  return tagMap
}

export function useCategoryList() {
  const [categoryList, setCategoryList] = useState<SelectorOption[]>([])

  useEffect(() => {
    request(api.getCategoryList).then(res => {
      setCategoryList(res.data)
    })
  }, [])

  return categoryList
}