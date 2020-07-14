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
        <a-range-picker :style="{width:'210px'}" @change="onChange"></a-range-picker>
        <a-input placeholder="名字/电话" :style="{width:'110px'}"/>
        <a-button icon="search" type="primary"> 搜索</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
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
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <!-- <step-by-step-modal ref="modal" @ok="handleOk"/> -->
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

// import StepByStepModal from '../list/modules/StepByStepModal'
import CreateForm from '../list/modules/CreateForm'

const columns = [
  {
    title: '序号',
    dataIndex: 'no'
  },
  {
    title: '测评机构',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '方案名称',
    dataIndex: 'callNo',
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  {
    title: '方案备注',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '收费',
    dataIndex: 'updatedAt'
  }, {
    title: '审核人',
    dataIndex: 'updatedAt2'
  },
  {
    title: '未完测评',
    dataIndex: 'updatedAt3'
  },
  {
    title: '完成测评',
    dataIndex: 'updatedAt4'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}
const provinceData = ['Zhejiang', 'Jiangsu']
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
}
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm
    // StepByStepModal
  },
  data () {
    this.columns = columns
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
		secondCity: cityData[provinceData[0]][0],
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleProvinceChange (value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
	},
		onChange () {},
    handleChange () {},
    onSearch () {}
  }
}
</script>
