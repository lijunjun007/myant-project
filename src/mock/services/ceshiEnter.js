import Mock from 'mockjs2'
import { builder } from '../util'
const getceshitaocan = (option) => {
	console.log(option)
	var taocan = [
		{
			id: 1,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 0.56,
			shenheRen: ['黄师傅', '孙师傅', '曾师傅', '刘师傅'],
			unclose: 3,
			close: 5
		},
		{
			id: 2,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 5.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 3,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 4.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 4,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 3.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 5,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 2.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 6,
			jigou: '光菱科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 1.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 7,
			jigou: '光菱科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 9.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 8,
			jigou: '光菱科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 8.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 9,
			jigou: '光菱科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 7.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 10,
			jigou: '光菱科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 10.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 11,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 11.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 12,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 16.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 13,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 13.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 14,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 14.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		},
		{
			id: 15,
			jigou: '肃桥科技',
			name: '被路况济走级表',
			descri: 'LNBHR',
			zifei: 20.56,
			shenheRen: ['黄**'],
			unclose: 3,
			close: 5
		}
	]
	return builder({
		'data': taocan,
		'pageSize': 10,
		'pageNo': 0,
		'totalPage': 6,
		'totalCount': 57
	})
}
 Mock.mock(/\/api\/getceshitaocan/, 'get', getceshitaocan)
