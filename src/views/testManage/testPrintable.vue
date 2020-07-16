<template>
  <div>
    <page-header-wrapper>
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" tab="单表结果">
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns1"
            :data="loadData"
            :alert="false"
            showPagination="auto"
          >
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="方案结果">
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns2"
            :data="loadData"
            :alert="false"
            showPagination="auto"
          >
          </s-table>
        </a-tab-pane>
        <template slot="tabBarExtraContent">
          <div>
            <a-select :default-value="provinceData[0]" v-model="city1" style="width: 120px" @change="handleProvinceChange">
              <a-select-option v-for="province in provinceData" :key="province">
                {{ province }}
              </a-select-option>
            </a-select>
            <a-select v-model="city2" style="width: 120px">
              <a-select-option v-for="city in cityData" :key="city">
                {{ city }}
              </a-select-option>
            </a-select>
            <a-select v-show="tabChangeboo" v-model="city3" style="width: 120px">
              <a-select-option v-for="city in qu" :key="city">
                {{ city }}
              </a-select-option>
            </a-select>
            <a-range-picker :style="{width:'200px'}" @change="onChange" :placeholder="['开始时间','结束时间']"></a-range-picker>
            <a-input placeholder="姓名/电话" :style="{width:'100px'}"/>
            <a-button-group>
              <a-button icon="search" type="primary"> 搜索</a-button>
              <a-button v-show="tabChangeboo" icon="file-search" type="primary"> 高级</a-button>
              <a-button v-show="tabChangeboo" icon="download" type="danger"> 导出</a-button>
            </a-button-group>
          </div>
        </template>
      </a-tabs>
    </page-header-wrapper>
  </div>
</template>

<script>
import { STable } from '@/components'
import api from '@/api/manage'
const provinceData = ['全部测评机构', '测试商户1', '测试商户2']
const cityData = ['全部测评方案', '测评方案1', '测评方案2']
const qu = ['全部量表', '量表1', '量表2']
export default {
	created () {
		},
	components: {
     STable
  },
	data () {
		return {
		// 级联下拉选择框
		provinceData,
		cityData,
		qu,
		city1: provinceData[0],
		city2: cityData[0],
		city3: qu[0],
		tabChangeboo: true,
		columns1: [
					{
				title: '序号',
				dataIndex: 'xuhao'
			},
			{
				title: '测评机构',
				dataIndex: 'jigou'
			},
			{
				title: '测评方案',
				dataIndex: 'fangan'
			},
			{
				title: '参测人员',
				dataIndex: 'testuser'
			},
			{
				title: '性别',
				dataIndex: 'xingbie'
			},
			{
				title: '结果评级',
				dataIndex: 'grade'
			},
			{
				title: '测试时间',
				dataIndex: 'time'
			},
			{
				title: '操作',
				dataIndex: 'action'
			}
		],
		columns2: [
					{
				title: '序号',
				dataIndex: 'xuhao'
			},
			{
				title: '测评机构',
				dataIndex: 'jigou'
			},
			{
				title: '测评方案',
				dataIndex: 'fangan'
			},
			{
				title: '参测人员',
				dataIndex: 'testuser'
			},
			{
				title: '性别',
				dataIndex: 'xingbie'
			},
			{
				title: '结果评级',
				dataIndex: 'grade'
			},
			{
				title: '测试时间',
				dataIndex: 'time'
			},
			{
				title: '操作',
				dataIndex: 'action'
			}
		],
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
	methods: {
		handleProvinceChange (value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
	},
		onChange () {},
		callback () {
			this.tabChangeboo = !this.tabChangeboo
		}
	}
}

</script>
<style scoped>
</style>
