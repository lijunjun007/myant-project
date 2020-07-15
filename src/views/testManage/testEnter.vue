<template>
  <div>
    <page-header-wrapper :title="aditShow?'方案编辑':'测试入口'">
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" :style="{'padding-bottom':'10px'}">
            <a-row :gutter="[16,16]">
              <a-col :sm="{ span:24}" :md="{ span:6,offset:12}">
                <a-select default-value="0" style="width: 100%" @change="handleChange">
                  <a-select-option value="0">
                    全部
                  </a-select-option>
                  <a-select-option value="1">
                    测试商户(某某某)
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :sm="{ span:24}" :md="{ span:6}">
                <a-input-search v-model="queryParam.str" placeholder="输入关键字" @search="onSearch">
                  <a-button type="primary" icon="search" slot="enterButton">
                    搜索
                  </a-button>
                </a-input-search>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          :alert="true"
          :rowSelection="rowSelection"
          showPagination="auto"
        >
          <span slot="name" slot-scope="text,record" :title="text">
            <span class="set-name-enter" @click="openAditTest(record)">[设置]</span>{{ text }}
          </span>
          <span slot="shenheRenStr" slot-scope="text" :title="text">
            {{ text }}
          </span>
          <span slot="unclose" slot-scope="text">
            <a-button type="link" icon="eye">{{ text }}</a-button>
          </span>
          <span slot="close" style="cursor:pointer" slot-scope="text">
            <a-button type="link" icon="eye">{{ text }}</a-button>
          </span>
          <span slot="action" slot-scope="record">
            <a-button-group size="small" >
              <a-button type="primary" color="#375D81" icon="tool" @click="ceshi(record)">测试</a-button>
              <a-button style="background-color:#5d0" color="#215D81" icon="snippets" @click="yulan(record)">预览</a-button>
              <a-button style="background-color:#0dd" color="#375D81" icon="form" @click="jieguo(record)">结果</a-button>
            </a-button-group>
          </span>
        </s-table>
        <div v-show="aditShow" class="full-page" style="margin:0" title="方案编辑">
          <div style="margin:20px auto;width:80%">
            <a-form-model :model="singledata" layout="vertical" :label-col="{sapn:8,offset:4}" :wrapper-col="{sapn:12}">
              <a-form-model-item label="名称">
                <a-input v-model="singledata.name" />
              </a-form-model-item>
              <a-form-model-item label="是否审核">
                <a-select v-model="singledata.isShenHe">
                  <a-select-option key="true">
                    审核
                  </a-select-option>
                  <a-select-option key="false">
                    不审核
                  </a-select-option>
                </a-select>

              </a-form-model-item>
              <a-form-model-item v-show="singledata.isShenHe=='true'" label="是否审核">
                <a-select v-model="singledata.ShenHeType">
                  <a-select-option key="auto">
                    自动审核
                  </a-select-option>
                  <a-select-option key="noauto">
                    不自动审核
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="审核人列表">
                <a-select
                  mode="multiple"
                  placeholder="Please select"
                  :default-value="singledata.shenheRen"
                  @change="shenherenChange"
                >
                  <a-select-option v-for="(item,i) in singledata.shenheRen" :key="i">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>

              <a-form-model-item label="显示结果">
                <a-select>
                  <a-select-option key="auto">
                    显示
                  </a-select-option>
                  <a-select-option key="noauto">
                    不显示
                  </a-select-option>
                </a-select>
              </a-form-model-item>

              <a-form-model-item label="结束语">
                <a-input placeholder="输入结束语" />
              </a-form-model-item>

              <a-form-model-item label="排序索引">
                <a-input type="Number"/>
              </a-form-model-item>

              <a-form-model-item label="复测周期">
                <a-input :disabled="cycleLimit" class="inline-input" type="Number"/> 天
                <a-input :disabled="cycleLimit" class="inline-input" type="Number"/> 小时
                <a-checkbox @change="(e)=>{cycleLimit=e.target.checked}">不限制</a-checkbox>
              </a-form-model-item>
              <a-form-model-item label="知情书">
                <editor :init="init" class="ceshibianji"></editor>
              </a-form-model-item>
            </a-form-model>
            <a-button @click="()=>{aditShow=false}">确认</a-button>
            <a-button @click="()=>{aditShow=false}">关闭</a-button>
          </div>
        </div>
      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
import { STable } from '@/components'
import api from '@/api/manage'
// import StepByStepModal from '../list/modules/StepByStepModal'

import Editor from '@tinymce/tinymce-vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '80px',
    sorter: (a, b) => a.id - b.id
  },
  {
    title: '测评机构',
    dataIndex: 'jigou',
    filters: [
            { text: '肃桥科技', value: '肃桥科技' },
            { text: '光菱科技', value: '光菱科技' }
          ],
    onFilter: (value, record) => record.jigou.includes(value)
  },
  {
    title: '方案名称',
    dataIndex: 'name',
    ellipsis: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '方案备注',
    dataIndex: 'descri'
  },
  {
    title: '收费',
    dataIndex: 'zifei',
    sorter: (a, b) => a.zifei - b.zifei
  }, {
    title: '审核人',
    dataIndex: 'shenheRenStr',
    ellipsis: true,
    scopedSlots: { customRender: 'shenheRenStr' }
  },
  {
    title: '未完测评',
    dataIndex: 'unclose',
    needTotal: true,
    scopedSlots: { customRender: 'unclose' }
  },
  {
    title: '完成测评',
    dataIndex: 'close',
    needTotal: true,
    scopedSlots: { customRender: 'close' }

  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '250px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Editor
    // StepByStepModal
  },
  mounted () {
  },
  data () {
    this.columns = columns
    return {
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
        return this.$http(api.getceshitaocan, 'get', requestParameters)
          .then(res => {
            for (let i = 0; i < res.result.data.length; i++) {
              res.result.data[i].shenheRenStr = this.arrayToStr(res.result.data[i].shenheRen)
            }
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      aditShow: false,
      singledata: {},
      cycleLimit: true,
      init: {
        // 组件
        plugins:
          ' lists image colorpicker textcolor wordcount contextmenu autoresize',
        // 工具栏
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat ',
        branding: false,
        min_height: 300,
        menubar: false,
        images_upload_handler: (blobInfo, success, failure) => {
          success('data:image/jpeg;base64,' + blobInfo.base64())
        }
      }
    }
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
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleChange () {},
    onSearch () {
      this.$refs.table.refresh(true)
    },
    openAditTest (record) {
      this.aditShow = true
      this.singledata = record
      //
      this.singledata.isShenHe = 'true'
      this.singledata.ShenHeType = 'auto'
    },
    strToArray (str) {
      str = str.trim()
      return str.split(',')
    },
    arrayToStr (array) {
      return array.join(',')
    },
    shenherenChange (value) {
      console.log(`Selected: ${value}`)
    }
  }
}
</script>
<style  scoped>
.set-name-enter{
  color: #40A9FF;
  cursor: pointer;
}
.ant-form-item{
  margin-bottom: 0;
}
.inline-input{
  display: inline-block;
  width: 100px;
}
::v-deep .tox .tox-notifications-container .tox-notification {
  display: none;
}
.tox-notifications-container{
  height: 0;
  width: 0;
}
</style>
