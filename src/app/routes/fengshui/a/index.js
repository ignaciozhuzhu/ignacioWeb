import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "shared/components/Button"
import "./styles.less"

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
        <h1 className="t-center">评测结束</h1>
        <div className="t-center background-top">
          <span className="spanvam"></span>
        </div>
        <h3 className="t-center">该测评仅部分试用</h3>
        <h3 className="t-center">如需详细测试请关注我们公众号</h3>
        <div className="margintop20">
          <div className="btn-select"><Button key="bad" className="btn-darken" onClick={this.oncemore}>再测一次</Button></div>
          <div className="btn-select"><Button key="good" className="btn-darken">分享结果</Button></div>
        </div>
      </div>
    )
  }
  oncemore = () => {
    window.location.href = "./fengshui"
  }
}