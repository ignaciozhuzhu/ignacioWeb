import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import Modal from "shared/components/Modal"
import Pagination from "shared/components/Pagination"
import classNames from "classnames"
import helper from "shared/libs/helper"
import moment from "moment"
import { adminEmail } from "../../../../config"
import getArticleLists from "./action"

import "./styles.less"

@connect(
  ({ AdminAction }) => ({
    articleData: AdminAction.lists,
  }),
  (dispatch) => (
    bindActionCreators({
      getArticleLists
    }, dispatch)
  )
)

//暂时性的管理后台  用来管理文章审核
export default class Admin extends React.PureComponent {
  state = {
    articleList: [],
    contentModalVisible: false,
    content: "无",
    loading: false,
    pageIndex: 1
  }
  pageSize = 5
  contentType = "portrait" //是否是竖屏
  render() {
    const {
      articleList,
      contentModalVisible,
      content,
      loading,
      pageIndex
    } = this.state
    const { articleData } = this.props
    const articleLists = articleData && articleData.articleList

    const count = articleData && articleData.count
    return (
      <section className="admin-section">
                <h2 className="title">文章审核</h2>
                <table>
                    <thead>
                        <tr>
                            <td>标题</td>
                            <td>内容</td>
                            <td>作者</td>
                            <td>发表日期</td>
                            <td>PV</td>
                            <td>赞</td>
                            <td>邮箱</td>
                            <td>分类</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articleLists && articleLists.length >= 1
                                ? (
                                    articleLists.map((item, i) => {
                                        const {
                                        _id,
                                            title,
                                            content,
                                            author,
                                            publishDate,
                                            pageView,
                                            like,
                                            approve,
                                            email = adminEmail,
                                            category
                                    } = item
                                        let date = moment(publishDate).format("YYYY-MM-DD HH:mm:ss")
                                        return (
                                            <tr key={i}>
                                                <td>{title}</td>
                                                <td><a onClick={() => this.showContent(content)} className="btn btn-info">查看</a></td>
                                                <td>{author}</td>
                                                <td>{date}</td>
                                                <td>{pageView}</td>
                                                <td>{like}</td>
                                                <td>{email}</td>
                                                <td>{category}</td>
                                                <td>
                                                    {
                                                        !approve
                                                            ?
                                                            loading
                                                                ? <Button type="disbled">审核中...</Button>
                                                                : <Button type="info" onClick={() => this.onApprove(_id, title, date, email)}>通过</Button>

                                                            : <span>已审核</span>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                                : (<tr>
                                    <td colSpan="10">暂无数据</td>
                                </tr>)
                        }
                    </tbody>
                </table>
                <Pagination
                    className="admin-pagination"
                    total={count}
                    current={pageIndex}
                    onChange={this.getArticlePageLists}
                />
                <Modal
                    title="查看文章内容"
                    visible={contentModalVisible}
                    onCancel={this.cancelContentModal}
                    className="edit-article-modal"
                >
                    {content}
                </Modal>
            </section>
    )
  }
  getArticlePageLists = (type, current) => {
    let { pageIndex } = this.state

    this.props.getArticleLists({
      pageIndex: type == "prev" ? --pageIndex : ++pageIndex,
      pageSize: this.pageSize
    })
    this.setState({
      pageIndex: current
    })
  }

  cancelContentModal = () => {
    this.setState({
      contentModalVisible: false
    })
  }
  showContent = (content) => {
    this.setState({
      contentModalVisible: true,
      content
    })
  }
  onApprove = async(id, title, publishDate, email) => {
      if (confirm(`确认通过 【${title}】?`)) {
        this.setState({ loading: true })
        await helper.postJson('/admin/approve', { id, title, publishDate, email })
        Message.success('审核通过！')
        this.props.getArticleLists({
          pageIndex: this.state.pageIndex,
          pageSize: this.pageSize
        })
        this.setState({
          loading: false,
        })
      }
    }
    //如果用户是小屏通知他横屏显示
  landScapeNotice = () => {
    //拿到css 里面的伪类  屌屌哒  
    const content = getComputedStyle(this.section, ":after").getPropertyValue('content')
    if (content.replace(/(\'|\")/g, "") == this.contentType) {
      Message.info('请横屏查看!')
    }
  }

  componentDidMount() {
    this.section = ReactDOM.findDOMNode(this)
    window.addEventListener('resize', this.landScapeNotice)
    this.landScapeNotice()
    this.props.getArticleLists({
      pageIndex: this.state.pageIndex,
      pageSize: this.pageSize
    })
  }
}