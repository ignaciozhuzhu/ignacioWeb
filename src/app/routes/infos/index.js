import React from 'react'
import {
  Button,
  message,
  Modal
} from 'antd'
import SearchBar from 'components/searchbar'
import Table from 'components/table'
import {
  FormModal
} from 'components/modalForm'
import 'whatwg-fetch'
import './index.less'
import moment from 'moment'
import {
  musicKindList,
  languageKindList,
  publishCountry,
  orientationList,
  rentLiveList,
  isBoolList
} from '../../../common/utils/config'
import {
  //accountLogin,
  // yc_list
  //location2
} from '../../../common/utils/getData'

//import { connect } from 'react-redux'
//import helper from "../../../common/utils/helper"
import helper from "libs/helper"

require('es6-promise').polyfill();

const confirm = Modal.confirm

export default class Infos extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        tData: [],
        item: {},
        loading: true,
        modalShow: false,
        modalShowEdit: false,
        totalPrice: 0,
      }
      // this.add = this.add.bind(this)
    this.onOk = this.onOk.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onOkEdit = this.onOkEdit.bind(this)
    this.onCancelEdit = this.onCancelEdit.bind(this)
  }

  async fetchTableData(par) {
    var O = {
      room: par
    }
    const lists = await helper.getJson("/infos/lists", O)
    let json = lists.data.articleLists;
    for (let i = 0; i < json.length; i++) {
      /*      json[i].SN = json[i].SN == 'south' ? '南' : '北';
            json[i].rentLive = json[i].rentLive == 'rent' ? '出租' : '自住';
            json[i].isCheck = json[i].isCheck ? '是' : '否';
            json[i].isReserve = json[i].isReserve ? '是' : '否';
            json[i].isPark = json[i].isPark ? '是' : '否';
            json[i].isNear = json[i].isNear ? '是' : '否';*/
    }
    this.setState({
      tData: json
    });
    this.setState({
      loading: false
    });
  }

  async componentDidMount() {
    // const Login = await accountLogin("13858118593", "123456", "3");
    //ListData = await yc_list();
    this.fetchTableData("0") // 默认是所有
  }

  onSearch = (searchFields) => {
    // const typeId = searchFields.type ? searchFields.type : 2
    //  this.fetchTableData(typeId, searchFields)
    this.fetchTableData(searchFields.type)
  }

  searchFields = () => {
    return [
      /*    {
            title: '类型(单独搜索)',
            key: 'type',
            type: 'select',
            defaultValue: 2,
            onChange: (value) => this.fetchTableData(value),
            items: () => musicKindList.map(ele => ({
              value: ele.value,
              mean: ele.mean
            })),
          }, */
      {
        title: '房间',
        key: 'type',
        type: 'input',
        defaultValue: 2,
        onChange: (value) => this.fetchTableData(),
        items: () => musicKindList.map(ele => ({
          value: ele.value,
          mean: ele.mean
        })),
      },
      /*      {
              title: '朝向',
              key: 'SN',
              type: 'select',
              defaultValue: '全部',
              items: () => orientationList.map(ele => ({
                value: ele.value,
                mean: ele.mean
              })),
            }, {
              title: '租||住',
              key: 'rentLive',
              type: 'select',
              defaultValue: '全部',
              items: () => rentLiveList.map(ele => ({
                value: ele.value,
                mean: ele.mean
              })),
            }, {
              title: '购买时间段',
              key: ['start', 'end'],
              type: 'rangePicker',
            }*/
    ]
  }

  tableHeader = () => {
    return [{
      dataIndex: 'No',
      title: '幢',
      width: 100,
    }, {
      dataIndex: 'room',
      title: '室',
      width: 100,
    }, {
      dataIndex: 'SN',
      title: '朝向',
      width: 100,
      render: (text, record) => text = record.SN === "south" ? '南' : '北',
    }, {
      dataIndex: 'buyTime',
      title: '购买时间',
      width: 150,
      render: (text, record) => text = record.buyTime.substr(0, 10)
    }, {
      dataIndex: 'totalPrice',
      title: '总价(万)',
      width: 150,
    }, {
      dataIndex: 'unitPrice',
      title: '单价(万)',
      width: 150,
    }, {
      dataIndex: 'rentLive',
      title: '租||住',
      width: 150,
      render: (text, record) => text = record.rentLive === "rent" ? '出租' : '自住',
    }, {
      dataIndex: 'isCheck',
      title: '已交房',
      width: 100,
      render: (text, record) => text = record.isCheck === "1" ? '是' : '否',
    }, {
      dataIndex: 'isReserve',
      title: '已订装修',
      width: 100,
      render: (text, record) => text = record.isReserve === "1" ? '是' : '否',
    }, {
      dataIndex: 'isPark',
      title: '购置车位',
      width: 100,
      render: (text, record) => text = record.isPark === "1" ? '是' : '否',
    }, {
      dataIndex: 'isNear',
      title: '是否邻近',
      width: 100,
      render: (text, record) => text = record.isNear === "1" ? '是' : '否',
    }, ]
  }

  onOk(param) {
    message.success('添加成功')
    this.onCancel()
  }

  onCancel() {
    this.setState({
      modalShow: false,
      //  item: {},
    })
  }

  async onOkEdit(param) {
    const lists2 = await helper.postJson("/infos/update", this.state.item)
    this.setState({
      modalShowEdit: false
    })
    message.success('编辑成功')
    this.fetchTableData()
  }

  onCancelEdit() {
    this.setState({
      modalShowEdit: false
    })
  }

  tableAction = (actionKey, item) => {
    if (actionKey === 'edit') {
      this.setState({
        item: item,
        modalShowEdit: true
      })
    }
  }

  fieldsEdit = () => {
    let item = this.state.item
    return [{
      label: '朝向',
      type: 'select',
      name: 'SN',
      items: () => orientationList.map(ele => ({
        key: ele.value,
        value: ele.mean
      })),
      options: {
        initialValue: item.SN,
        rules: [{
          required: true,
          message: '朝向必选!',
        }],
        onChange: (e) => {
          //debugger
          item.SN = e
          this.setState({ item: item })
        },
      }
    }, {
      label: '购买时间',
      type: 'datetime',
      name: 'buyTime',
      options: {
        initialValue: moment(item.buyTime),
        /*        rules: [{
                  required: true,
                  message: '购买时间必输!',
                }]*/
      }
    }, {
      label: '总价',
      type: 'input',
      name: 'totalPrice',
      items: item.totalPrice,
      options: {
        initialValue: item.totalPrice,
        onChange: (e) => {
          item.totalPrice = e.target.value
          this.setState({ item: item })
        },
      }
    }, {
      label: '单价',
      type: 'input',
      name: 'unitPrice',
      items: item.unitPrice,
      options: {
        initialValue: item.unitPrice,
        onChange: (e) => {
          item.unitPrice = e.target.value
          this.setState({ item: item })
        },
      }
    }, {
      label: '租||住',
      type: 'select',
      name: 'rentLive',
      items: () => rentLiveList.map(ele => ({
        key: ele.value,
        value: ele.mean
      })),
      options: {
        initialValue: item.rentLive,
        onChange: (e) => {
          item.rentLive = e
          this.setState({ item: item })
        },
      }
    }, {
      label: '已交房',
      type: 'select',
      name: 'isCheck',
      items: () => isBoolList.map(ele => ({
        key: ele.value,
        value: ele.mean
      })),
      options: {
        initialValue: item.isCheck,
        onChange: (e) => {
          item.isCheck = e
          this.setState({ item: item })
        },
      }
    }, {
      label: '已订装修',
      type: 'select',
      name: 'isReserve',
      items: () => isBoolList.map(ele => ({
        key: ele.value,
        value: ele.mean
      })),
      options: {
        initialValue: item.isReserve,
        onChange: (e) => {
          item.isReserve = e
          this.setState({ item: item })
        },
      }
    }, {
      label: '购置车位',
      type: 'select',
      name: 'isPark',
      items: () => isBoolList.map(ele => ({
        key: ele.value,
        value: ele.mean
      })),
      options: {
        initialValue: item.isPark,
        onChange: (e) => {
          item.isPark = e
          this.setState({ item: item })
        },
      }
    }, {
      label: '是否邻近',
      type: 'select',
      name: 'isNear',
      items: () => isBoolList.map(ele => ({
        key: ele.value,
        value: ele.mean
      })),
      options: {
        initialValue: item.isNear,
        onChange: (e) => {
          item.isNear = e
          this.setState({ item: item })
        },
      }
    }]
  }

  render() {
    return (
      <div id="wrap">
                <SearchBar
                    onSubmit={this.onSearch}
                    fields={this.searchFields()}
                />
                <div className="tableBox">
                    <div style={{ paddingTop: 1 }}>
                        <Table
                            onCtrlClick={ this.tableAction }
                            pagination={ true }
                            pageSize={10}
                            header={ this.tableHeader() }
                            data={ this.state.tData }
                            loading={ this.state.loading }
                            action={row => [{
                                key: 'edit',
                                name: '修改',
                                color: 'blue',
                                icon: 'edit',
                            }]}
                            scroll={{y: false }}
                        />
                    </div>
                </div>
                <FormModal
                    modalKey="Edit"
                    visible={this.state.modalShowEdit}
                    title="编辑"
                    fields={this.fieldsEdit()}
                    onOk={this.onOkEdit}
                    onCancel={this.onCancelEdit}
                    okText="保存"
                />
            </div>
    )
  }
}