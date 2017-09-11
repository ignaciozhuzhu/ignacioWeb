import React from 'react'
import RotatePhoto from "shared/components/RotatePhoto"
import Message from "shared/components/Message"
import ImageGallery from 'react-image-gallery'
import Button from "shared/components/Button"
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.less"

class Results extends React.PureComponent {
  render() {
    const { title, content, next, click } = this.props
    return (
      <div>
        <p className="marginLeft10">[{title}]</p>
        <p className="marginLeft10">
          {content}
        </p>
        {next ? <div className="btn-select-middle margintop20"><Button key="badBoy" className="btn-darken" onClick={click}>下一题</Button></div> : null }
      </div>
    )
  }
}
const images = [{
  url: require("images/fengshui/fs1.png"),
  question: "您家是否存在:房门对房门",
  explain: "房门对房门是指:室内卧室门对卧室门,会有口舌争吵及家庭不合的现象发生",
  hit: "1.建议设置不透光的玄关或屏风来化解.2.大门入口处安放一尊秘法九转乾坤阵"
}, {
  url: require("images/fengshui/fs2.png"),
  question: "您家是否存在:灶和冰箱相对",
  explain: "厨房的冰箱正对灶，此为水火相克之局，会有漏财和意外血光、子孙不孝的现象发生。",
  hit: "（1）最好能调整位置，才能完全化解，风水法器很难化此煞。 　　（2）实在不能调整，只能先在灶和冰箱之间，挂一只木葫芦降低煞气。需要注意的是，木制易燃，不能离灶头太近。"
}, {
  url: require("images/fengshui/fs3.png"),
  question: "您家是否存在:房门冲床",
  explain: "床摆向直冲房门，会对身体健康产生极大影响，门冲到哪就会伤到哪，所以不可不谨慎。",
  hit: "（1）最好调整床的位置，如果暂时无法调整，可以在房门与床之间，安放屏风化解。 　　（2）在房门上挂一串白玉葫芦五帝古钱，六帝钱都可以。 "
}, ]

export default class Fengshui extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    showHits: false,
    showButtonBottom: true,
    i: 0
  }
  render() {
    return (
      <div className="margin10">
        <h1 className="t-center">居家风水评测{this.state.i+1}/3</h1>
        <div className="t-center background-top">
          <span className="spanvam"></span><img className="vam" src={images[this.state.i].url}/>
        </div>
        <p className="marginLeft10">{images[this.state.i].question}</p>
        <Results title="解释" content={images[this.state.i].explain}  />
         { this.state.showHits ? <Results title="破解" content={images[this.state.i].hit} next click={this.next} /> : null }
         { this.state.showButtonBottom ?
        <div className="margintop20">
          <div className="btn-select"><Button key="bad" className="btn-darken" onClick={this.hit}>不幸命中</Button></div>
          <div className="btn-select"><Button key="good" className="btn-darken" onClick={this.next}>完美避过</Button></div>
        </div>
         : null}
      </div>
    )
  }
  hit = () => {
    this.setState({ showHits: true, showButtonBottom: false });
  }
  next = () => {
    this.setState({ showHits: false, showButtonBottom: true, i: this.state.i < 2 ? this.state.i + 1 : this.state.i });
    if (this.state.i == 2)
      window.location.href = "./fengshui2"
  }
}