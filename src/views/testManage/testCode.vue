<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div style="padding-bottom:15px">
        <a-select :default-value="provinceData[0]" style="width: 120px">
          <a-select-option v-for="province in provinceData" :key="province">
            {{ province }}
          </a-select-option>
        </a-select>
        <a-select v-model="cityData[0]" style="width: 120px">
          <a-select-option v-for="city in cityData" :key="city">
            {{ city }}
          </a-select-option>
        </a-select>
        <a-select v-model="qu[0]" style="width: 120px">
          <a-select-option v-for="city in qu" :key="city">
            {{ city }}
          </a-select-option>
        </a-select>
        <a-range-picker :style="{width:'210px'}" @change="onChange" :placeholder="['开始时间','结束时间']"></a-range-picker>
        <a-input placeholder="名字/电话" :style="{width:'110px'}"/>
        <a-button-group>
          <a-button icon="search" type="primary"> 搜索</a-button>
          <a-button icon="printer" type="primary" @click="()=>{modalShow1=true}"> 打印</a-button>
          <a-button icon="delete" type="primary"> 作废</a-button>
        </a-button-group>
      </div>

      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :alert="false"
        showPagination="auto"
      >
        <!-- <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">配置</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a>
          </template>
        </span> -->
      </s-table>
    </a-card>
    <a-modal
      title="打印"
      :visible="modalShow1"
      :footer="null"
      width="45%"
      @cancel="modalShow1=false"
    >
      <div>
        <a-form>
          <a-form-item label="打印备注" class="clean-f-mri">
            <a-input placeholder="请输入本次打印备注 如：XXX体检方案" />
          </a-form-item>
          <a-form-item label="打印数量" class="clean-f-mri">
            <a-input-number :defaultValue="30" />
          </a-form-item>
          <a-form-item label="打印二维码（表示是否打印二维码图片）" class="clean-f-mri">
            <a-checkbox>
            </a-checkbox>
          </a-form-item>
          <a-form-item label="是否包含打印以往已经打印且未使用的测试码（不建议勾选）" class="clean-f-mri">
            <a-checkbox>
            </a-checkbox>
          </a-form-item>
          <a-button type="primary">
            确认
          </a-button>
        </a-form>
      </div>
    </a-modal>
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
    title: '测试码',
    dataIndex: 'ceshima',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '打印备注',
    dataIndex: 'beizhu',
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  {
    title: '打印时间',
    dataIndex: 'printtime',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '领用人',
    dataIndex: 'lingyongren'
  }, {
    title: '领用日期',
    dataIndex: 'lingyongdate'
  },
  {
    title: '使用人',
    dataIndex: 'user'
  },
  {
    title: '使用人昵称',
    dataIndex: 'usernick'
  },
  {
    title: '使用日期',
    dataIndex: 'usedate'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]
const provinceData = ['使用状态', '未使用', '已使用', '已作废']
const cityData = ['领用状态', '未领用', '已领用']
const qu = ['全部领用人']
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      provinceData,
      cityData,
      qu,
      columns,
      // 查询参数
      queryParam: {
        list1: null,
        list2: null,
        list3: null,
        list4: null,
        list5: null
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return this.$http(api.getceshicode, 'get', requestParameters)
          .then(res => {
            return res.result
          })
      },
		modalShow1: false
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
  // created () {
  //   getRoleList({ t: new Date() })
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
  //   handleProvinceChange (value) {
  //     this.cities = cityData[value]
  //     this.secondCity = cityData[value][0]
	// },
		onChange () {}
  }
}
</script>
