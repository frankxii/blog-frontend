import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'antd/dist/antd.min.css'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom"
import FrontPage from "./page/front/FrontPage"
import BackPage from "./page/back/BackPage"


axios.defaults.baseURL = 'http://localhost:8000'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/blog" component={FrontPage}/>
        <Route path="/backend" component={BackPage}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
