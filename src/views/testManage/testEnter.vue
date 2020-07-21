<template>
  <div>
    <page-header-wrapper title="测试入口">
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-row type="flex" justify="end" :gutter="8" style="padding-bottom:20px">
            <a-col>
              <a-select default-value="0" style="width:150px" @change="handleChange">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  测试商户(某某某)
                </a-select-option>
              </a-select>
            </a-col>
            <a-col>
              <a-input-search v-model="queryParam.str" placeholder="输入关键字" @search="onSearch" style="width:240px">
                <a-button type="primary" icon="search" slot="enterButton">
                  搜索
                </a-button>
              </a-input-search>
            </a-col>
          </a-row>
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
            <a-button type="link" style="border:none" icon="eye">{{ text }}</a-button>
          </span>
          <span slot="close" style="cursor:pointer" slot-scope="text">
            <a-button type="link" style="border:none" icon="eye">{{ text }}</a-button>
          </span>
          <span slot="action" slot-scope="text,record">
            <a-button-group size="small">
              <a-button type="primary" color="#375D81" icon="tool" @click="ceshi(record)">测试</a-button>
              <a-button style="background-color:#5d0" color="#215D81" icon="snippets" @click="yulan(record)">预览</a-button>
              <a-button style="background-color:#0dd" color="#375D81" icon="form" @click="jieguo(record)">结果</a-button>
            </a-button-group>
          </span>
        </s-table>
        <a-modal
          title="方案编辑"
          :visible="modalShow1"
          :confirm-loading="modalconfirmLoading1"
          @ok="modalhandleOk1"
          @cancel="()=>{modalShow1=false}"
        >
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
        </a-modal>
        <a-modal
          :title="`《${singledata.name}》测试入口`"
          :visible="modalShow2"
          :footer="null"
          @cancel="modalShow2=false"
        >
          <a-row>
            <a-col :span="12">
              <p>1、手机扫码进入测试</p>
              <vue-qr :logoSrc="imgUrl" style="width:60%;padding-left:20px" text="https://c-ssl.duitang.com/uploads/blog/201410/30/20141030222429_NCtdc.jpeg" :size="200"></vue-qr>
            </a-col>
            <a-col :span="12">
              <p>2、电脑点击进入测试</p>
              <a-textarea defaultValue="https://c-ssl.duitang.com/uploads/blog/201410/30/20141030222429_NCtdc.jpeg" :rows="6" :readOnly="true"></a-textarea>
            </a-col>
          </a-row>
        </a-modal>
        <a-modal
          title="预览"
          :visible="modalShow3"
          :footer="null"
          width="45%"
          @cancel="modalShow3=false"
          class="modal3"
        >
          <div class="modalcontentform">
            <div class="form-list-title1">Krawiecka症状量表</div>
            <div class="form-list-title2">知情同意书</div>
            <p class="form-mar-y">心理测试</p>
            <div class="form-list-title2 form-mar-y" >一般资料</div>
            <a-form style="width:50%">
              <a-form-item label="姓名">
                <a-input type="text" placeholder="请填写姓名" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="性别">
                <a-input type="text" placeholder="请填写性别" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="出生日期">
                <a-input type="text" placeholder="请填写出生日期" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="职业">
                <a-input type="text" placeholder="请填写职业" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="民族">
                <a-input type="text" placeholder="请填写民族" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="户口性质">
                <a-input type="text" placeholder="请填写户口性质" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="文化程度">
                <a-input type="text" placeholder="请填写文化程度" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="婚姻状况">
                <a-input type="text" placeholder="请填写婚姻状况" class="form-bottom-border"/>
              </a-form-item>
              <a-form-item label="籍贯">
                <a-input type="text" placeholder="请填写籍贯" class="form-bottom-border"/>
              </a-form-item>
            </a-form>
            <hr style="border:.5px dashed #000;" class="form-mar-y">
            <div class="form-list-title2">Krawiecka症状量表</div>
            <p style="margin-top:30px">本量表由经过训练的精神科专业人员进行测定</p>
            <p class="form-mar-y">请回答下列问题</p>
            <div v-for="(item,i) in valueArr" :key="'index'+i">
              <div class="form-list-title3" style="padding-top:15px">{{ i+1+'.'+item.title }}</div>
              <a-radio-group style="margin-left:20px" v-model="valueKey[i]">
                <a-radio v-for="(val,j) in item.list" :key="'list'+j" :value="j">
                  {{ val }}
                </a-radio>
              </a-radio-group>
            </div>
          </div>
        </a-modal>
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
    return {
      imgUrl: require('../../assets/icons/head_icon.png'),
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
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      modalShow1: false,
      modalShow2: false,
      modalShow3: false,
      modalconfirmLoading1: false,
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
        menubar: false
      },
      valueKey: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
      ],
      valueArr: [
      {
        title: '抑郁 ',
        list: [
        'A、无',
        'B、轻度,发现某些迹象,如病人有些忧愁、缺乏热情,但检查者可认为是一般习惯表现,并不能确定',
        'C、中度,发现最近一周病人感到抑郁苦恼,但交谈中自感到与平素表现迥然不同,而已可肯定临床表现者,尽管抑郁程度不重',
        ' D、显著的抑郁感受或表现,常常出现,有时感到非常痛苦',
        'E、严重的抑郁,出现强烈的自杀观念,难以控制的哭泣,或由此感到极度痛苦等极重抑郁的症状'
      ]
      },
      {
        title: '焦虑 ',
        list: [
        'A、无',
        'B、轻度,病人表现的紧张,可能是对交谈场合的可理解反应,可能是一种习惯表现,难以确定是否病态者',
        'C、中度,焦虑在最近周内时有发生,并为此感到苦恼,尽管不重,已具临床意义',
        'D、显著焦虑,如交谈中出现忧虑并需要安慰,可伴有轻度运动性激越,或最近1周内常常出现而感苦恼,或有时发生但导致非常痛苦',
        'E、严重的焦虑,感到无法松弛,或因焦虑而中断交谈,可伴显著的运动性激越,或一种将会遇到可怕事情的想法盘踞着头脑,或最近一周内常常焦虑并引起极度痛苦'
      ]
      },
      {
        title: '情感平淡或不协调 ',
        list: [
        'A、无',
        'B、轻度,与病人讨论时能引起激情的主题时却显得言语简短,所言不多或没有明显反应,可能认为是他的习惯表现而非病态',
        'C、中度,情感反应缺损虽轻,但临床意义已可肯定,例如讨论重大问题时,比较肯定的缺乏情感基调',
        'D、显著的情感反应缺损,缺乏激情,例如谈到自己的情况不能表达出客观实践对他的心理影响,对将来也没有什么表示',
        'E、严重,极显著的情感反应缺损。任凭怎样进行启发，也没有什么情感反应'
      ]
      },
      {
        title: '精神运动性迟缓',
        list: [
        'A、无',
        'B、轻度,似平有情感反应不协调。但临床意义不肯定',
        'C、中度,有时出现不协情感反应,程度虽轻但临床意义已可肯定',
        'D、显著,常不协调情感反应或有时出现明显的情感不协调',
        'E、严重,常有明显的情感不协调,例如毫无道理地盛气凌人或无缘由格格傻笑,以致明显干扰交谈'
      ]
      },
      {
        title: '连续的妄想',
        list: [
        'A、无',
        'B、轻度,虽有缓慢或主动性较差的迹象,但临床意义不明显',
        'C、中度,精神运动性迟缓或缺乏主动性程度虽轻,但临床意义已可肯定,例如回答问题时有些延迟,但看来不是习惯而是病态',
        'D、显著,显而易见的精神运动性迟缓',
        'E、严重,精神运动性迟缓极为严重'
      ]
      },
      {
        title: '幻觉',
        list: [
        'A、无',
        'B、轻度,有离奇的想法和轻微的误解,例加认为核试验会造成坏天气,也包括迷信和宗教观念等,但临床意义不肯定',
        'C、中度,超价观念及牵连观念,或无疑是错误的解释,或特殊意义的异常解释',
        'D、显著,在数月前发生的肯定的妄想,而患者如今否认其存在,或者对现有妄想不十分坚信',
        'E、严重,目前仍然艰辛的妄想'
      ]
      },
      {
        title: '言语散漫或不连贯',
        list: [
        'A、无',
        'B、轻,虽有幻觉体验,但临床意义不肯定,或者是入睡前幻觉,或者是保留与记忆中的视觉印象或错觉',
        'C、中度,假性幻听或幻视,或者能自知的幻觉,例加在生死离别后出现的幻觉',
        'D、显著,过去1周中曾有真性幻觉,但不常出现',
        'E、严重，过去1周中经常出现真性幻觉'
      ]
      },
      {
        title: '言语贫乏与缄默',
        list: [
        'A、无',
        'B、轻度,虽然有时回答显得离奇古怪,但还够不上联想障碍的条件,因此临床意义不肯定',
        'C、中度,有时表现出障碍的迹象(如联想松弛),但其余时间仍然连贯,其程度虽轻,但临床意义已可肯定',
        'D、显著,常有联想障碍的迹象,但仍可与患者作有意义的言语交流,或者数次阵法的不连贯言语(如思维破裂）',
        'E、严重,由于缺乏词与词之间的直接联系(言语不连贯),所回答的言语使人难以理解,言语常常不连贯(思维破裂),辨认不出意义上的前后线索'
      ]
      }
      ]
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
      // const form = this.$refs.createModal.form
      // form.resetFields() // 清理表单数据（可不做）
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleChange () {},
    onSearch () {
      this.$refs.table.refresh(true)
    },
    openAditTest (record) {
      this.singledata = record
      this.modalShow1 = true
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
      this.singledata.shenheRen = value
      this.singledata.shenheRenStr = this.arrayToStr(value)
    },
    modalhandleOk1 (e) {
      console.log('修改过后的', this.singledata)
      this.modalconfirmLoading1 = true
      setTimeout(() => {
        this.modalShow1 = false
        this.modalconfirmLoading1 = false
      }, 2000)
    },
    ceshi (record) {
      this.singledata = record
      this.modalShow2 = true
    },
    yulan (record) {
      this.singledata = record
      this.modalShow3 = true
    },
    jieguo () {}
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
.form-list-title1{
  font-size: 24px;
  text-align:center;
  font-weight:bold;
  padding-bottom: 50px;
}
.form-list-title2{
  font-size: 20px;
  font-weight: bold;
}
.form-list-title3{
  padding-bottom:15px;
  font-size: 14px;
  font-weight: bold;
}
/* .modal3 .ant-modal{
  top:50px !important;
} */
.modal3 .modalcontentform{
  height:650px;
  overflow-y:scroll;
}
.modal3 .modalcontentform::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
    }
.form-bottom-border{
  border-width:0 0 2px 0
}
.form-mar-y{
  margin:30px 0
}
/deep/ .ant-radio-wrapper{
     white-space: pre-wrap;
     display: flex;
}
>>> .ant-radio{
  align-self: self-start;
}
>>> .ant-form-item label>div>.ant-col{
  margin-left: 10px;
}
</style>
