import React from "react"
import Button from "shared/components/Button"
import { Link } from "react-router"
import "./styles.less"

export default class Header extends React.PureComponent {
  static defaultProps = {
    title: "龙鸿轩"
  }
  state = {
    showBack: false
  }
  render() {
    const { animateTime } = this.props
    const animationDuration = {
      "animationDuration": `${animateTime}s`
    }
    const { showBack } = this.state
    return (
      <header key="header" className="header" style={animationDuration}>
                {
                    showBack
                    ?  <div key="left" className="block left" onClick={()=>this.goBack()}></div>
                    : undefined
                }
                <div key="center" className="center" title="鼠标点击一下就可以返回~">
                    <h2 key="title" className="title" onClick={this.goBack}>{this.props.title}</h2>
                </div>
                {/*<Link to="fengshui"><Button className="aa" type="primary">居家风水测评(beta)</Button></Link>*/}
                {
                    showBack
                    ? <div key="right" className="block right"></div>
                    : undefined
                }
            </header>
    )
  }
  componentDidMount() {
    if (history.length > 1) {
      this.setState({ showBack: true })
    }
  }
  goBack = (url) => {
    if (history.length > 1) {
      this.setState({
        showBack: true
      })
      history.back()
    } else {
      if (typeof url == "undefined" || !url) {
        url = "/"
      }
      history.href = url
    }
  }
  goMyGit = (url) => {
    window.location.href = "https://www.github.com/ignaciozhuzhu/"
  }
}