import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import { Link } from "react-router"
import classNames from "classnames"
import uploadExcel, { sendEmail } from "./action"
import { defaultEmailTitle, tableFields, companyName, currentTime,toolInfo } from "../../../../config"

import "./styles.less"

@connect(
    ({ ExcelAction }) => ({
        excelInfo: ExcelAction.excelInfo,
        successUsers:ExcelAction.successUsers
    }),
    (dispatch) => (
        bindActionCreators({
            uploadExcel,
            sendEmail
        }, dispatch)
    )
)

export default class Excel extends React.PureComponent {
    state = {
        excelReady: false,   //表格是否能上传
        excelInfo: [],
        sendEmailReady: false,
        emailTile: undefined,
        activeType: "one",
        previewTitle: defaultEmailTitle,
        sendEmailTime: currentTime(),
        sendEmailLoading:false
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { excelInfo, excelReady,sendEmailLoading, sendEmailReady, activeType, previewTitle, sendEmailTime } = this.state
        const { excelInfo: excelResult,successUsers } = this.props
        return (
            <div key="excel">
                <main className="content" key="content">
                    <Container className="home">
                        <h1 className="title">
                            <span className={classNames({ "active": activeType === "one" })}>1.选择工资条excel(确保格式正确)  <span>>></span></span>
                            <span className={classNames({ "active": activeType === "two" })}> 2.确认工资条信息 <span>>></span> </span>
                            <span className={classNames({ "active": activeType === "three" })}>3.发送邮件(填写邮件标题)</span>
                        </h1>
                        <form method="post" name="upload-excel-form" encType="multipart/form-data" className="upload-excel-form">
                            <input type="file" name="excel" ref="excel" className="hidden excle-origin-btn" onChange={this.selectExcel} />
                            <Button type="info" onClick={this.clickFileBtn}>选择工资表</Button>
                            {/*{
                                excelReady
                                    ? <Button className="home-btn" htmlType="button" type="primary" onClick={this.uploadExcel}>确认工资条信息</Button>
                                    : <Button className="home-btn" htmlType="button" type="error" onClick={() => alert('请选择工资表')} >未选择工资表</Button>
                            }*/}

                            <ol className="none">
                                {
                                    excelInfo.length >= 1
                                        ? excelInfo.map((item, i) => {
                                            let { size, name } = item
                                            return (
                                                <li key={i} className="item">【Excel名字】：<strong>{name}</strong> <span className="fg"></span> {size}</li>
                                            )
                                        })
                                        : <h2>未选择工资表</h2>
                                }
                                <li></li>
                            </ol>
                            {
                                excelResult && excelResult.length >= 1
                                    ? (
                                        <div>
                                            <hr />
                                            <h4 className="title center">确认工资条信息</h4>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        {
                                                            Object.values(tableFields).map((value) => (<td>{value}</td>)).slice(0,Object.values(tableFields).length -1)
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        excelResult.map((item, index) => {
                                                            return (
                                                                <tr key={`tbody${index}`}>
                                                                    <td>{item[tableFields["id"]]}</td>
                                                                    <td>{item[tableFields["department"]]}</td>
                                                                    <td>{item[tableFields['name']]}</td>
                                                                    <td>{item[tableFields['duty']]}</td>
                                                                    <td>{item[tableFields['baseWage']]}</td>
                                                                    <td>{item[tableFields['daysLostFromWork']]}</td>
                                                                    <td>{item[tableFields['absenceDeductions']]}</td>
                                                                    <td>{item[tableFields['beLate']]}</td>
                                                                    <td>{item[tableFields['bonus']]}</td>
                                                                    <td>{item[tableFields['wagesPayable']]}</td>
                                                                    <td>{item[tableFields['insurance']]}</td>
                                                                    <td>{item[tableFields['reservedFunds']]}</td>
                                                                    <td>{item[tableFields['subtotal']]}</td>
                                                                    <td>{item[tableFields['OtherDeduction']]}</td>
                                                                    <td>{item[tableFields['salary']]}</td>
                                                                    <td>{item[tableFields['taxWage']]}</td>
                                                                    <td>{item[tableFields['ToBeCollectedTax']]}</td>
                                                                    <td>{item[tableFields['netPayroll']]}</td>
                                                                    <td>{item[tableFields['remark']]}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="preview">
                                                <h4 className="title">发送到邮箱的格式  大致如下:</h4>
                                                <h5 className="sub-title">标题: {previewTitle.replace("{name}", "xxx")}</h5>
                                                <table className="preview-table" key="preview-table">
                                                    <thead>
                                                        <tr>
                                                            {
                                                                Object.values(tableFields).map((value) => {
                                                                    return (
                                                                        <td>{value}</td>
                                                                    )
                                                                })
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {
                                                                Object.keys(tableFields).map((item) => (<td>xxxx</td>))
                                                            }
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p className="preview-footer" style={{"marginTop":"20px"}}>{companyName}</p>
                                                <p className="preview-footer">{sendEmailTime}</p>
                                                <p className="preview-footer">{toolInfo}</p>
                                            </div>
                                            {
                                                sendEmailReady
                                                    ? (
                                                        <div className="send-email-btn">
                                                            <input type="text" onChange={this.changeMailTitle} placeholder="邮件标题: tip 不填则使用默认标题 [年+月+员工名字+工资表]" />
                                                            {
                                                                sendEmailLoading
                                                                ? <Button type="disabled">发送邮件中...请稍后</Button>
                                                                : <Button type="warning" onClick={this.sendEmail}>确认发送邮件</Button>
                                                            }
                                                            
                                                        </div>

                                                    )
                                                    : undefined
                                            }

                                        </div>
                                    )
                                    : excelResult && excelResult.code && Message.warning(`${excelResult.message}:(`) && this.setState({ sendEmailReady: false })

                            }
                        </form>
                    </Container>
                </main>
            </div>
        )
    }
    changeMailTitle = (e) => {
        const value = e.target.value
        if (value == "") {
            this.setState({ previewTitle: defaultEmailTitle })
        } else {
            this.setState({ previewTitle: e.target.value })
        }
    }
    sendEmail = async () => {
        const { sendEmailTime, previewTitle } = this.state
        if(confirm(`邮件名【${previewTitle}】.确认发送吗?`)){
            this.setState({sendEmailLoading:true,activeType:"three"})
            await this.props.sendEmail(previewTitle, sendEmailTime)
            if(this.props.successUsers){
                this.setState({sendEmailLoading:false})
                Message.info(`【${this.props.successUsers.join("|")}】邮件发送成功!请提醒他们注意查收`)
            }
        }
    }
    //上传工资表
    uploadExcel = () => {
        const formEle = this.dom.querySelector('.upload-excel-form')
        const formData = new FormData(formEle)
        const { uploadExcel } = this.props
        uploadExcel(formData)
        this.setState({ sendEmailReady: true, activeType: "two" })
    }
    clickFileBtn = () => {
        const fileBtn = this.dom.querySelector('.excle-origin-btn')
        fileBtn.click()
    }
    selectExcel = () => {
        var _this = this
        const files = Array.from(this.refs.excel.files);
        let req = ""
        files.forEach((file) => {
            let { type, name, size } = file;
            /.*\.xls$/.test(name) ? req = /^application\/vnd\.ms-excel$/ig : req = /^application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet$/ig
            //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
            if (!req.test(type)) {
                return Message.error('错误的的文件类型,请上传xls 或 xlsx格式的文件')
            }
            const reader = new FileReader();
            reader.onprogress = () => {
                console.debug(`${name}读取中,请稍后`);
            };
            reader.onabort = () => {
                this.setState({
                    excelReady: false,
                })
                Message.error(`${name}读取中断,请重试`)
            };
            reader.onerror = () => {
                this.setState({
                    excelReady: false
                })
                Message.error(`${name}读取失败`, 请重试)
                console.debug(`${name}读取失败!`)
            };
            reader.onload = function () {
                console.debug(`${name}读取成功,文件大小：${size / 1024}KB`)
                const result = this.result;        //读取失败时  null   否则就是读取的结果
                _this.setState({
                    excelReady: true,
                    activeType: "two",
                    excelInfo: [
                        {
                            name,
                            size: `${~~(size / 1024)}kb`
                        }]
                })
                _this.uploadExcel()
            }
            reader.readAsDataURL(file);      //base64
        })
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
    }
}
