import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.min.css'
import axios from 'axios'
import {
  BrowserRouter as Router, Redirect,
  Route, Switch
} from "react-router-dom"
import FrontPage from "./page/front/FrontPage"
import BackPage from "./page/back/BackPage"


axios.defaults.baseURL = 'http://localhost:8000'

ReactDOM.render(
  <React.Fragment>
    <Router>
      <Switch>
        <Route path="/blog" component={FrontPage}/>
        <Route path="/backend" component={BackPage}/>
        {/*react 重定向 https://www.jianshu.com/p/a5268ac7b566*/}
        <Redirect to="/blog"/>
      </Switch>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
