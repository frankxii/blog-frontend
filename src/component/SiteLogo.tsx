import React from "react"

import {Link} from "react-router-dom"
import {CustomerServiceOutlined} from "@ant-design/icons"

export default function SiteLogo(props: { theme: string }) {

  return (
    <Link to="/front">
      <CustomerServiceOutlined style={{color: props.theme}}/>
      <span style={{color: props.theme, marginLeft: 10}}>frankxii's blog</span>
    </Link>
  )
}