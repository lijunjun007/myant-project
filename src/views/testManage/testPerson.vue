<template>
  <div>
    <page-header-wrapper>
      <a-card>
        <a-row type="flex" :gutter="16" :style="{'padding-bottom':'16px'}" >
          <a-col >
            <a-select default-value="全部性别" style="width:120px" @change="handleChange">
              <a-select-option value="全部性别">
                全部性别
              </a-select-option>
              <a-select-option value="男">
                男
              </a-select-option>
              <a-select-option value="女">
                女
              </a-select-option>
            </a-select>
          </a-col>
          <a-col >
            <a-range-picker @change="onChange" :placeholder="['开始时间','结束时间']"></a-range-picker>
          </a-col>
          <a-col >
            <a-input-search placeholder="姓名/电话" @search="onSearch">
              <a-button type="primary" icon="search" slot="enterButton">
                搜索
              </a-button>
            </a-input-search>
          </a-col>
        </a-row>
        <s-table
          ref="table"
          size="default"
          rowKey="xuhao"
          :columns="columns"
          :data="loadData"
          :alert="true"
          :rowSelection="rowSelection"
          :showPagination="false"
        >
        </s-table>
      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
import { STable } from '@/components'
import api from '@/api/manage'
  export default {
    created () {
    },
  components: {
     STable
  },
    data () {
      return {
        columns: [
          {
    title: '序号',
    dataIndex: 'xuhao'
  },
   {
    title: '姓名',
    dataIndex: 'xingming'
  },
   {
    title: '昵称',
    dataIndex: 'nicheng'
  },
   {
    title: '性别',
    dataIndex: 'xingbie'
  },
   {
    title: '手机号',
    dataIndex: 'shoujihao'
  },
   {
    title: '地址',
    dataIndex: 'dizhi'
  },
   {
    title: '首参时间',
    dataIndex: 'shoucanshijian'
  },
   {
    title: '测试记录',
    dataIndex: 'ceshijilu'
  }
        ],
        queryParam: {},
        selectedRowKeys: [],
        loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return this.$http(api.getceshirenyuan, 'get', requestParameters)
          .then(res => {
            return res.result
          })
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
      handleChange () {},
      onChange () {},
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onSearch () {}
    }
  }

</script>
<style scoped>
span.ant-input-group{
  width: 80%;
}
button.ant-btn{
  padding: 0 5px;
}
.ant-btn > .anticon + span{
  margin-left: 0;
}
</style>
