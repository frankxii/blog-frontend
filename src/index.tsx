import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.less'
import './app.css'
import {
  BrowserRouter as Router, Redirect,
  Route, Switch
} from "react-router-dom"

import FrontPage from "./page/front/FrontPage"
import BackPage from "./page/back/BackPage"

ReactDOM.render(
  <React.Fragment>
    <Router>
      <Switch>
        <Route path="/front" component={FrontPage}/>
        <Route path="/back" component={BackPage}/>
        {/*react 重定向 https://www.jianshu.com/p/a5268ac7b566*/}
        <Redirect to="/front/article"/>
      </Switch>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
)