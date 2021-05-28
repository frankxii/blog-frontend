import React from "react"

import {Row, Col, Layout, Card, Affix} from "antd"

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

  const {Content} = Layout
  const width = window.outerWidth

  let marginTop = 0
  if (width > 500) marginTop = 65

  let contentMinHeight = "85vh"
  if (width < 1900) {
    contentMinHeight = "82vh"
  }
  if (width < 500) {
    contentMinHeight = "91vh"
  }

  return (
    <div>
      <Affix>
        <Row align={"middle"} style={{backgroundColor: "white",}}>
          {/*Fork me on Github*/}
          {width < 500 ? null :
            <a className="github-fork-ribbon"
               href="https://github.com/frankxii"
               target="_blank"
               rel="noreferrer"
               data-ribbon="Fork me on Github"
            >fork me</a>}
          <Col md={{offset: 1}} lg={{offset: 2}} xl={{offset: 3}} xxl={{offset: 5}}>
            {width < 500 ? null :
              <SiteLogo theme={"black"}/>
            }
          </Col>
          <Col md={{offset: 1}} lg={{offset: 1}} xl={{offset: 2}} xxl={{offset: 2}}>
            <Navigator/>
          </Col>
        </Row>
      </Affix>

      {/*content容器*/}
      <Layout>
        <Content style={{backgroundColor: '#FAFAFA'}}>
          <Row style={{
            minHeight: contentMinHeight,
            marginTop: marginTop
          }}>
            {/*主要内容区域*/}
            <Col
              xs={{span: 24}}
              md={{span: 14, offset: 1}}
              lg={{span: 15, offset: 1}}
              xl={{span: 14, offset: 2}}
              xxl={{span: 14, offset: 3}}
            >
              <Card>
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
            {width < 500 ? null :
              <Col lg={{offset: 1}} xl={{offset: 2}}>
                <Affix offsetTop={marginTop + 48}>
                  <div>
                    {/*分类挂件*/}
                    <CommonPendant cate='category'/>
                    {/*时间挂件*/}
                    <div style={{marginTop: "2vh"}}>
                      <CommonPendant cate='month'/>
                    </div>
                    {/*标签云*/}
                    <div style={{marginTop: "2vh"}}>
                      <TagCloudPendant/>
                    </div>
                  </div>
                </Affix>
              </Col>}
          </Row>
          <Row justify="center">
            <Col>
              <a href="http://beian.miit.gov.cn" target="_blank" rel="noreferrer">
                渝ICP备2021005054
              </a>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}