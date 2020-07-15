import Mock from 'mockjs2'
import { builder } from '../util'
const ceshiPeoplelist = (options) => {
	console.log('options', options)
	const list = [{
		'xuhao': 1,
		'xingming': '里根',
		'nicheng': '小里',
		'xingbie': '男',
		'shoujihao': 12345678901,
		'dizhi': '重庆南岸',
		'shoucanshijian': '2013-02-10',
		'ceshijilu': 'aaaa'
	}]
	return builder({
		'data': list,
		'pageSize': 10,
		'pageNo': 0,
		'totalPage': 6,
		'totalCount': 57
	})
}
Mock.mock(/\/api\/getceshirenyuan/, 'get', ceshiPeoplelist)
