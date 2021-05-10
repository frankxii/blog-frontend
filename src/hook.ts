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

export function useCategoryList() {
  const [categoryList, setCategoryList] = useState<SelectorOption[]>([])

  useEffect(() => {
    request(api.getCategoryList).then(res => {
      setCategoryList(res.data)
    })
  }, [])
  return categoryList
}