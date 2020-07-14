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
            <a-range-picker @change="onChange"></a-range-picker>
          </a-col>
          <a-col >
            <a-input-search placeholder="input search text" @search="onSearch">
              <a-button type="primary" icon="search" slot="enterButton">
                搜索
              </a-button>
            </a-input-search>
          </a-col>
        </a-row>
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

        </s-table>
      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
import { STable } from '@/components'
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
        selectedRowKeys: [],
        loadData: () => {
        var ss = setTimeout(function () {
          return {
          xuhao: '1',
          xingming: '李军',
          nicheng: 'lijun',
          xingbie: '男',
          shoujihao: 123456,
          dizhi: '重庆',
          shoucanshijian: '2020/7/12',
          ceshijilu: 'ssssss'
        }
        }, 200)
        return ss
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
</style>
