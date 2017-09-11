import helper from "libs/helper"
import fetch from 'common/utils/fetch'
let data
let lists

let rooms = [];
for (let j = 1; j < 12; j++) {
  for (let i = 1; i < 33; i++) {
    if (i < 10) i = '0' + i
    rooms.push({
      No: 3,
      room: j + '' + i,
      rentLive: 1,
      SN: 'south',
    })
  }
}
/*async function a() {
  const lists = await helper.getJson("/article2/lists2", "")
}
a();*/
/*async function b() {
  lists = await helper.getJson("/infos/lists3", "")
  debugger
  return lists.data.articleLists;
  //debugger
}*/
//b();

//export const aa = b();

//rooms[0].totalPrice = 50;

/*export const data2 = [{
  No: 3,
  room: 901,
  SN: 'south',
  buyTime: '2017.3',
  totalPrice: '40',
  unitPrice: '1.66',
  rentLive: 'rent',
  isCheck: 0,
  isReserve: 0,
  isPark: 0,
  isNear: 0
}, {
  No: 3,
  room: 902,
  SN: 'south',
  buyTime: '2017.3',
  totalPrice: '40',
  unitPrice: '1.66',
  rentLive: 'rent',
  isCheck: 0,
  isReserve: 0,
  isPark: 0,
  isNear: 0
}, {
  No: 3,
  room: 903,
  SN: 'south',
  buyTime: '2017.3',
  totalPrice: '40',
  unitPrice: '1.66',
  rentLive: 'rent',
  isCheck: 0,
  isReserve: 0,
  isPark: 0,
  isNear: 0
}, {
  No: 3,
  room: 904,
  SN: 'south',
  buyTime: '2017.3',
  totalPrice: '40',
  unitPrice: '1.66',
  rentLive: 'rent',
  isCheck: 0,
  isReserve: 0,
  isPark: 0,
  isNear: 0
}, {
  No: 3,
  room: 905,
  SN: 'south',
  buyTime: '2017.3',
  totalPrice: '40',
  unitPrice: '1.66',
  rentLive: 'rent',
  isCheck: 0,
  isReserve: 0,
  isPark: 0,
  isNear: 0
}]*/