import React from "react"

import {Row, Col, Layout, Card, Affix} from "antd"
import {Content} from "antd/es/layout/layout"

import {Route} from "react-router-dom"

import About from "./About"
import Article from "./Article"
import ArticleList from "./ArticleList"
import Welcome from "./Welcome"
import Navigator from "./Navigator"
import CommonPendant from "../../component/CommonPendant"
import TagCloudPendant from "../../component/TagCloudPendant"
import Records from "./Records"
import SiteLogo from "../../component/SiteLogo"

export default function FrontPage(props: any) {

  return (
    <div>
      {/*导航栏*/}
      <Card style={{borderRadius: 8, width: '100%'}} bodyStyle={{padding: 0}}>
        <Row align="middle">
          <Col offset={6}>
            <SiteLogo theme={"black"}/>
          </Col>
          <Col span={12}>
            <Navigator/>
          </Col>
        </Row>
      </Card>
      {/*content容器*/}
      <Layout>
        <Content style={{padding: '64px 50px', minHeight: 895, backgroundColor: '#FAFAFA'}}>
          <Row>
            {/*主要内容区域*/}
            <Col span={13} offset={4}>
              <Card style={{borderRadius: 8, minHeight: 200}}>
                <Route exact path={`${props.match.path}`} component={Welcome}/>
                <Route exact path={`${props.match.path}/article`} component={ArticleList}/>
                <Route path={`${props.match.path}/article/:id`} component={Article}/>
                <Route path={`${props.match.path}/records`} component={Records}/>
                <Route path={`${props.match.path}/about`} component={About}/>
                <Route
                  path={`${props.match.path}/category/:category_name`}
                  component={ArticleList}/>
                <Route path={`${props.match.path}/tag/:tag_name`} component={ArticleList}/>
                <Route path={`${props.match.path}/month/:month`} component={ArticleList}/>
              </Card>
            </Col>
            <Col offset={2}>
              <Affix offsetTop={113}>
                <div>
                  {/*分类挂件*/}
                  <CommonPendant cate='category'/>
                  {/*时间挂件*/}
                  <div style={{marginTop: 20}}>
                    <CommonPendant cate='month'/>
                  </div>
                  {/*标签云*/}
                  <div style={{marginTop: 20}}>
                    <TagCloudPendant/>
                  </div>
                </div>
              </Affix>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}