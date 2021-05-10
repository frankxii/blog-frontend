import {Select} from "antd"
import React from "react"
import {SelectorOption} from "../interface"

export default function Selector(
  props: {
    current: SelectorOption,
    setCurrent: CallableFunction,
    optionList: SelectorOption[]
  }
) {

  const optionList = props.optionList
  const current = props.current
  const setCurrent = props.setCurrent
  const {Option} = Select

  return (
    <Select
      value={current.text}
      style={{width: 120}}
      onChange={(value: string, option: any) => setCurrent({id: parseInt(option.key), name: value})}
    >
      {optionList.map(option => <Option key={option.value} value={option.text}>{option.text}</Option>)}
    </Select>)
}