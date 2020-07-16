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

const ceshiresult = (options) => {
	console.log('options', options)
	const resu = [{
		'xuhao': 1,
		'jigou': '**医院',
		'fangan': '***1方案',
		'testuser': '李大锤',
		'xingbie': '男',
		'tel': 12345678901,
		'grade': 'f',
		'time': '2020-09-12',
		'action': '按钮组'
	}, {
		'xuhao': 2,
		'jigou': '**医院',
		'fangan': '***2方案',
		'testuser': '李大花',
		'xingbie': '女',
		'tel': 12345678901,
		'grade': 'A',
		'time': '2020-09-10',
		'action': '按钮组'
		}]
	return builder({
		'data': resu,
		'pageSize': 10,
		'pageNo': 0,
		'totalPage': 6,
		'totalCount': 2
	})
}
const ceshicode = (options) => {
	console.log('options', options)
	const resu = [{
		'xuhao': 1,
		'ceshima': 'CX4241120994',
		'beizhu': '备注1111',
		'printtime': '2020-10-24',
		'lingyongren': '王小二',
		'lingyongdate': '2020-10-24',
		'user': '张全蛋',
		'usernick': '蛋蛋',
		'usedate': '2019-10-24',
		'status': 1,
		'action': '增删改查'
	}, {
		'xuhao': 2,
		'ceshima': 'CX4241120994',
		'beizhu': '备注2222',
		'printtime': '2020-10-24',
		'lingyongren': '王da二',
		'lingyongdate': '2020-10-24',
		'user': '李大爷',
		'usernick': '爷爷',
		'usedate': '2019-10-24',
		'status': 0,
		'action': '增删改查'
	}]
	return builder({
		'data': resu,
		'pageSize': 10,
		'pageNo': 0,
		'totalPage': 6,
		'totalCount': 2
	})
}
Mock.mock(/\/api\/getceshirenyuan/, 'get', ceshiPeoplelist)
Mock.mock(/\/api\/getceshiresult/, 'get', ceshiresult)
Mock.mock(/\/api\/getceshicode/, 'get', ceshicode)
