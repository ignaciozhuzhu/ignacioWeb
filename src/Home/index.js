import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import MusicPlayer from "shared/components/MusicPlayer"
import { Link } from "react-router"
import classNames from "classnames"

import getMusic from "./action"
import "./styles.less"

@connect(
  ({ MusicPlayerAction, RootAction }) => ({
    musicData: MusicPlayerAction.musicData,
    isLoading: RootAction.isLoading
  }),
  (dispatch) => (
    bindActionCreators({
      getMusic
    }, dispatch)
  )
)

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { musicData } = this.props
    const featureConfig = [{
      title: "匿名聊天室",
      text: "请君畅所欲言",
      iconName: "icon-liaotian",
      href: "talk" ///myblog/
    }, {
      title: "照片墙",
      text: "凄(tian)美の爱情故事",
      iconName: "icon-zhaopian-copy",
      href: "photo" ///myblog/
    }, {
      title: "杂文集",
      text: "可发表文章可评论",
      iconName: "icon-luyinshuohuashengyin",
      href: "article" ///myblog/
    }, {
      title: "我记几",
      text: "打赏入口",
      iconName: "icon-2guanyuwomeneps",
      href: "about" ///myblog/
    }]
    return (
      <div key="home">
        <main className="content" key="content">
          <div className="feature">
            <ul key="home-feature" className="feature-list">
              {
                featureConfig.map((item,i)=>{
                  const {title,text,iconName,href} = item
                  return (
                    <li key={`item${i}`} className="item">
                      <div className="info">
                        <h2 className="title">{title}</h2>
                        <p className="text">{text}</p>
                      </div>
                      <span className="line"></span>
                      <div className="icon-content">
                        <i className={classNames("icon",iconName)}></i>
                      </div>
                      <Link to={href}></Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </main>
        <MusicPlayer
          musicSrc={musicData && musicData.src}
          imgSrc={musicData && musicData.image}
          name={musicData && musicData.name}
          mode={"mini"}       //full 完整模式  mini  迷你模式
          desc={musicData && musicData.desc}
          isUploadAudio={true}
        />
      </div>
    )
  }
  componentDidMount() {
    const { isLoading } = this.props
      //文档加载完成  加载音乐
      !isLoading && this.props.getMusic()
  }
}