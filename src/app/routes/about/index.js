import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import Modal from "shared/components/Modal"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import { Link } from "react-router"
import classNames from "classnames"

import "./styles.less"

const interestConfig = [{
    icon: "icon-2guanyuwomeneps",
    text: "西湖区第97阿珂"
  }, {
    icon: "icon-dianzan",
    text: "手工业体力劳动者!"
  }, {
    icon: "icon-article",
    text: `GitHub: {github}`
  }, {
    icon: "icon-shuohuaspeak",
    text: "公无渡河，公竟渡河"
  }]
  // 人生就像函数式编程,传入一个参数,返回一个Function,每个阶段付出的东西不一样得到的东西也就不一样,只有不断的执行函数Fun()()()才会得到你想要的结果,我想:人生也是如此
export default class About extends React.PureComponent {
  state = {
    headerImgModalVisible: false, //照片弹框
    qrCodeModalVisible: false //二维码弹框
  }
  myGitHub = 'https://github.com/ignaciozhuzhu'
  render() {
    const {
      headerImgModalVisible,
      qrCodeModalVisible,
    } = this.state
    return (
      <Container className="about-section">
                <div className="header-img-content">
                    <div className="header-img">
                        <span className="line"></span>
                        <div className="img" onClick={this.onOpenHeaderImgModal}>
                            <div className='show-title'><span><i className="icon icon-zhaopian-copy"></i></span></div>
                        </div>
                    </div>
                </div>
                <section className="about-content">
                    <ul className="about-interest">
                        {
                            interestConfig.map((item,index)=>{
                                let {icon,text} = item
                                return (
                                    <li key={index} className={classNames("item")} style={{"animationDelay":`${.3 * (index+1) * 4}s`}}>
                                        <i className={classNames('icon',icon)}></i>
                                        {
                                            icon == "icon-article"
                                             ? <a className="text" href={this.myGitHub} alt="github" title="立即前往" target="_blank">{this.myGitHub}</a>
                                             : <span className="text">{text}</span> 
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                {/*TODO  留言  */}
                <section className="qr-section">
                    <Button type="error" onClick={this.openQrCodeModal}>打赏</Button>
                </section>
                {/*撞击头像小块块*/}
                <div className="strike-section">
                    <img src={require("images/photo3.jpg")} alt="铁头娃"/>
                </div>

                {/*查看照片*/}
                <Modal
                    title="听说长得帅的都打赏了~"
                    visible={qrCodeModalVisible}
                    onCancel={this.onCloseQrCodeModal}
                    className="qr-code-modal"
                    footer={null}
                >
                    <div className="pay-content">
                        {
                            qrCodeModalVisible
                            ? (
                                <ul className="code-lists">
                                    <li className="code"><img src={require('images/alipay.jpg')} alt="alipay"/></li>
                                    <li className="code"><img src={require("images/weChatPay.png")} alt="weChatPay"/></li>
                                </ul>
                            )
                          : undefined
                        }
                    </div>
                </Modal>
                <Modal
                    title="[丑照] 功能主治:颈椎与失眠"
                    visible={headerImgModalVisible}
                    onCancel={this.onCloseHeaderImgModal}
                    className="header-img-modal"
                    footer={[
                        <Button key="badBoy" onClick={this.onBadBoy}>我晕丑</Button>,
                        <Button key="goodBoy" type="info" onClick={this.onGoodBoy}>真帅</Button>
                    ]}
                >
                    <div className="header-img-modal-content">
                        {
                            headerImgModalVisible
                            ? <img src={require("images/head_img.jpg")} alt=""/>
                            : undefined
                        }
                         
                    </div>
                </Modal>
            </Container>
    )
  }
  onCloseQrCodeModal = () => {
    this.setState({ qrCodeModalVisible: false })
  }
  openQrCodeModal = () => {
    this.setState({ qrCodeModalVisible: true })
  }
  onCloseHeaderImgModal = () => {
    this.setState({ headerImgModalVisible: false })
  }
  onBadBoy = () => {
    this.setState({ headerImgModalVisible: false })
    Message.warning('你瞎呀!')
  }
  onGoodBoy = () => {
    this.setState({ headerImgModalVisible: false })
    Message.success('有眼光!')
  }
  onOpenHeaderImgModal = () => {
    this.setState({ headerImgModalVisible: true })
  }
  componentDidMount() {

    console.info('关于我们动画设计制作 By:龙鸿轩 :)')

  }
}