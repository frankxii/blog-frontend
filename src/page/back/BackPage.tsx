import React, {Component} from 'react'

export default class BackPage extends Component<any, any> {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <p>hello back page</p>
    )
  }
}