import React, {Component} from 'react'
import Sidebar from "./Sidebar"
import Navigator from "./Navigator"

export default class BackPage extends Component<any, any> {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <Navigator/>
        <Sidebar/>
      </div>
    )
  }
}