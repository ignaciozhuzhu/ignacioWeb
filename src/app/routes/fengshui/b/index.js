import React from 'react'
import "./styles.less"

export default class Book extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    showHits: false,
    showHits2: false
  }
  render() {
    var aa = this;

    function a() {
      aa.setState({ showHits: true });
    }

    function a2() {
      aa.setState({ showHits2: true });
    }
    setTimeout(a, 1000)
    setTimeout(a2, 2000)
    return (
      <div>
        <div className="book preserve-3d">
          <div className="book-page-box book-page-1 preserve-3d flip-animation-1">
            <div className="book-page page-front">
              <p>
                翻页特效
              </p>
            </div>
          </div>
        </div>
        {this.state.showHits?
        <div className="book2 preserve-3d">
          <div className="book-page-box2 book-page-2 preserve-3d flip-animation-2">
            <div className="book-page page-front">
              <p>翻页特效</p>
            </div>
          </div>
        </div>:null}
        {this.state.showHits2?
        <div className="book3 preserve-3d">
          <div className="book-page-box2 book-page-3 preserve-3d flip-animation-3">
            <div className="book-page page-front">
              <p>翻页特效</p>
            </div>
          </div>
        </div>:null}

      </div>
    )
  }
}