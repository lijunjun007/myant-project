<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div style="padding-bottom:15px">
        <a-select :default-value="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
          <a-select-option v-for="province in provinceData" :key="province">
            {{ province }}
          </a-select-option>
        </a-select>
        <a-select v-model="secondCity" style="width: 120px">
          <a-select-option v-for="city in cities" :key="city">
            {{ city }}
          </a-select-option>
        </a-select>
        <a-range-picker :style="{width:'200px','margin-left':'10px'}" @change="onChange" :placeholder="['开始时间','结束时间']"></a-range-picker>
        <a-input placeholder="名字/电话" :style="{width:'110px','margin-left':'10px'}"/>
        <a-button icon="search" type="primary"> 搜索</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import api from '@/api/manage'

const columns = [
  {
    title: '序号',
    dataIndex: 'xuhao'
  },
  {
    title: '测评机构',
    dataIndex: 'jigou'
  },
  {
    title: '方案名称',
    dataIndex: 'fangan'
  },
  {
    title: '测评结果',
    dataIndex: 'grade'
  },
  {
    title: '参测人',
    dataIndex: 'testuser'
  }, {
    title: '电话',
    dataIndex: 'tel'
  },
  {
    title: '性别',
    dataIndex: 'xingbie'
  },
  {
    title: '测试时间',
    dataIndex: 'time'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px'
  }
]
const provinceData = ['全部方案', 'Jiangsu']
const cityData = {
  '全部方案': ['全部量表', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
}
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      provinceData,
      cityData,
      columns,
      cities: cityData[provinceData[0]],
		secondCity: cityData[provinceData[0]][0],
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return this.$http(api.getceshiresult, 'get', requestParameters)
          .then(res => {
            return res.result
          })
      }
    }
  },
  // filters: {
  //   statusFilter (type) {
  //     return statusMap[type].text
  //   },
  //   statusTypeFilter (type) {
  //     return statusMap[type].status
  //   }
  // },
  // computed: {
  //   rowSelection () {
  //     return {
  //       selectedRowKeys: this.selectedRowKeys,
  //       onChange: this.onSelectChange
  //     }
  //   }
  // },
  methods: {
    handleProvinceChange (value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
	},
		onChange () {}
  }
}
</script>
