import React from 'react'
import RotatePhoto from "shared/components/RotatePhoto"
import Message from "shared/components/Message"
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.less"

const images = [{
  original: require('images/yigu/IMG_1577.jpg'),
  thumbnail: require('images/yigu/IMG_1577 - 副本.jpg'),
  description: "求婚副本"
}, {
  original: require('images/yigu/IMG_1574.jpg'),
  thumbnail: require('images/yigu/IMG_1574 - 副本.jpg'),
  description: "求婚副本2"
}, {
  original: require('images/yigu/IMG_1575.jpg'),
  thumbnail: require('images/yigu/IMG_1575 - 副本.jpg'),
  description: "求婚副本3"
}, {
  original: require('images/yigu/IMG_1576.jpg'),
  thumbnail: require('images/yigu/IMG_1576 - 副本.jpg'),
  description: "求婚副本4"
}, {
  original: require('images/yigu/IMG_1578.jpg'),
  thumbnail: require('images/yigu/IMG_1578 - 副本.jpg'),
  description: "求婚早期作品"
}, {
  original: require('images/yigu/IMG_1579.jpg'),
  thumbnail: require('images/yigu/IMG_1579 - 副本.jpg'),
  description: "一人我饮酒醉"
}, {
  original: require('images/yigu/IMG_1580.jpg'),
  thumbnail: require('images/yigu/IMG_1580 - 副本.jpg'),
  description: "刁大大"
}, {
  original: require('images/yigu/IMG_1581.jpg'),
  thumbnail: require('images/yigu/IMG_1581 - 副本.jpg'),
  description: "健身两小时"
}, {
  original: require('images/yigu/IMG_1582.jpg'),
  thumbnail: require('images/yigu/IMG_1582 - 副本.jpg'),
  description: "王の蔑视"
}, {
  original: require('images/yigu/IMG_1587.jpg'),
  thumbnail: require('images/yigu/IMG_1587 - 副本.jpg'),
  description: "求婚副本5"
}, {
  original: require('images/yigu/IMG_1584.jpg'),
  thumbnail: require('images/yigu/IMG_1584 - 副本.jpg'),
  description: "老鹰捉小鸡"
}, {
  original: require('images/yigu/IMG_1585.jpg'),
  thumbnail: require('images/yigu/IMG_1585 - 副本.jpg'),
  description: "求婚副本6"
}, {
  original: require('images/yigu/IMG_1586.jpg'),
  thumbnail: require('images/yigu/IMG_1586 - 副本.jpg'),
  description: "我曾经是一个王者"
}, ]


export default class Photo extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div key="photo" className="photo-controller">
        <ImageGallery
          items={images}
          slideInterval={2000}
          lazyLoad={true}
          showPlayButton={false}
          onImageError={() => Message.error('帅照加载失败')}
          showIndex={true}
          showBullets={true}
        />
      </div>
    )
  }
}