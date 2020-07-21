<template>
  <div>
    <page-header-wrapper>
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" tab="单表结果">
          <s-table
            ref="table"
            size="default"
            rowKey="xuhao"
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
            rowKey="xuhao"
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
              <a-button v-show="tabChangeboo" icon="file-search" type="primary" @click="()=>{modalShow1=true}"> 高级</a-button>
              <a-button v-show="tabChangeboo" icon="download" type="danger"> 导出</a-button>
            </a-button-group>
          </div>
        </template>
      </a-tabs>
      <a-modal
        title="高级"
        :visible="modalShow1"
        :footer="null"
        width="45%"
        @cancel="modalShow1=false"
        class="modal1"
      >
        <div class="modalcontentform">
          <a-tabs type="card" @change="callback2">
            <a-tab-pane key="1" tab="基础信息" class="tab-panediv1">
              <a-form>
                <a-form-item label="测评机构" class="clean-f-mri">
                  <a-select default-value="1">
                    <a-select-option value="1">
                      测试商户（曾）
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="测评方案" class="clean-f-mri">
                  <a-select default-value="1">
                    <a-select-option value="1">
                      测评方案
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="量表" class="clean-f-mri">
                  <a-select default-value="1">
                    <a-select-option value="1">
                      量表
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="结果" class="clean-f-mri">
                  <a-select default-value="1">
                    <a-select-option value="1">
                      结果
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="测评时间" class="clean-f-mri">
                  <a-range-picker class="datepick" :placeholder="['开始时间','结束时间']"></a-range-picker>
                </a-form-item>
                <a-form-item label="姓名/电话" class="clean-f-mri">
                  <a-input placeholder="姓名/电话"/>
                </a-form-item>
                <a-form-item label="导出选项" class="clean-f-mri">
                  <a-checkbox @change="checkto">
                    结果横向输出
                  </a-checkbox>
                  <br>
                  <a-checkbox style="padding-left:5px" :indeterminate="c2" :disabled="checkboxBoo" >
                    因子维度结果输出
                  </a-checkbox>
                  <div style="color:red" >
                    注: 横向输出结果时,按最近一次完成结果输出
                  </div>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="一般资料">
              <div style="min-height:400px">
                请选择测评方案
              </div>
            </a-tab-pane>
          </a-tabs>
          <div class="modal-btn1">
            <a-button type="danger" icon="search">
              搜索
            </a-button>
            <a-button type="primary" icon="download" style="margin-left:20px">
              导出
            </a-button>
          </div>
        </div>
      </a-modal>
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
	},
		// c1: false,
		c2: false,
		modalShow1: false,
		checkboxBoo: true
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
		},
		callback2 () {},
		checkto (e) {
			if (e.target.checked) {
				this.checkboxBoo = false
			} else {
				this.c2 = false
				this.checkboxBoo = true
			}
		}
	}
}

</script>
<style scoped>
.modal1 .modalcontentform{
	position: relative;
	padding-bottom:50px ;
}
.modal1 .modalcontentform>.modal-btn1{
	position: absolute;
	left: 0;
	bottom: 0;
}
.tab-panediv1{
	height:400px;
	overflow-y:scroll;
}
.tab-panediv1::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
	}
</style>
