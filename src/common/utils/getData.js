//import 'whatwg-fetch'
import { fetch_get } from './common'
import fetch from './fetch'


/**
 * 诊所端登录
 */
export const accountLogin = (mobile, password, role) => fetch('/site/userLogin', { "mobile": mobile, "password": password, "role": role }, 'POST');

/**
 * 6.11.19修复单列表
	访问方式	GET
	是否登录	是
	输入	
	jgs_id:技工所id
	status:状态  0-未完成 1-返工中 2-反正完成 3-已完成
	doctor_id：医生id
	hp_name：患者名字
	order_no：单号
	currentPage  当前页码   为空时默认前10条
 */
export const yc_list = () => fetch('/yc/list');

export const location = () => fetch('/site/getLocation');


export const location2 = () => fetch('http://192.168.2.177:555/api/article/lists');