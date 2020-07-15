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
            :dataSource="[]"
            :alert="false"
            :rowSelection="rowSelection"
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
            :dataSource="[]"
            :alert="false"
            :rowSelection="rowSelection"
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
            <a-range-picker :style="{width:'180px'}" @change="onChange"></a-range-picker>
            <a-input placeholder="Basic usage" :style="{width:'100px'}"/>
            <a-button-group>
              <a-button icon="search" type="primary"> 搜索</a-button>
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
				dataIndex: 'xingming'
			},
			{
				title: '测评方案',
				dataIndex: 'nicheng'
			},
			{
				title: '参测人员',
				dataIndex: 'xingbie'
			},
			{
				title: '性别',
				dataIndex: 'shoujihao'
			},
			{
				title: '操作',
				dataIndex: 'dizhi'
			}
		],
		columns2: [
					{
				title: '序号',
				dataIndex: 'xuhao'
			},
			{
				title: '测评机构',
				dataIndex: 'xingming'
			},
			{
				title: '测评方案',
				dataIndex: 'nicheng'
			},
			{
				title: '参测人员',
				dataIndex: 'xingbie'
			},
			{
				title: '性别',
				dataIndex: 'shoujihao'
			},
			{
				title: '操作',
				dataIndex: 'dizhi'
			}
        ]
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
