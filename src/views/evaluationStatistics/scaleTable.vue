<template>
  <page-header-wrapper>
    <div style="position:relative">
      <a-row >
        <a-col :xs="{ span: 24 }" :xl="{ span: 12 }">
          <a-form class="liangbform">
            <a-form-item label="测评机构" class="clean-f-mri">
              <a-select default-value="1">
                <a-select-option value="1">
                  测试商户（曾）
                </a-select-option>
                <a-select-option value="2">
                  测试商户（孙）
                </a-select-option>
                <a-select-option value="3">
                  测试商户（刘）
                </a-select-option>
                <a-select-option value="4">
                  测试商户（军）
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="测评方案" class="clean-f-mri">
              <a-select default-value="1">
                <a-select-option value="1">
                  ******表1
                </a-select-option>
                <a-select-option value="2">
                  ******表2
                </a-select-option>
                <a-select-option value="3">
                  ******表3
                </a-select-option>
                <a-select-option value="4">
                  ******表4
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="测评量表" class="clean-f-mri">
              <a-select default-value="1">
                <a-select-option value="1">
                  ******表1
                </a-select-option>
                <a-select-option value="2">
                  ******表2
                </a-select-option>
                <a-select-option value="3">
                  ******表3
                </a-select-option>
                <a-select-option value="4">
                  ******表4
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="测评时间" class="clean-f-mri">
              <a-range-picker class="datepick" :placeholder="['开始时间','结束时间']"></a-range-picker>
            </a-form-item>
            <a-form-item label="文化程度" class="clean-f-mri">
              <a-select default-value="1">
                <a-select-option value="1">
                  小学
                </a-select-option>
                <a-select-option value="2">
                  初中
                </a-select-option>
                <a-select-option value="3">
                  高中
                </a-select-option>
                <a-select-option value="4">
                  专科
                </a-select-option>
                <a-select-option value="5">
                  本科
                </a-select-option>
                <a-select-option value="6">
                  硕士
                </a-select-option>
                <a-select-option value="7">
                  博士
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="职业" class="clean-f-mri">
              <a-select default-value="1">
                <a-select-option value="1">
                  医生
                </a-select-option>
                <a-select-option value="2">
                  程序员
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="性别" class="clean-f-mri">
              <a-select default-value="1">
                <a-select-option value="1">
                  男
                </a-select-option>
                <a-select-option value="2">
                  女
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="年龄">
              <a-input-number placeholder="最小年龄" style="width:100px" :min="0" :max="150" />~
              <a-input-number placeholder="最大年龄" style="width:100px" :min="0" :max="150" />
            </a-form-item>
            <a-button type="primary" icon="file-search" @click="routerToDetail()">查看</a-button>
          </a-form>
        </a-col>
      </a-row>
      <!-- viewliangbiao -->
      <div class="full-page" v-if="echartsDetailShow">
        <a-row type="flex" :gutter="4" style="margin-bottom:50px;">
          <a-col>
            <a-select default-value="1">
              <a-select-option value="1">
                文化程度
              </a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <a-select default-value="1">
              <a-select-option value="1">
                职业
              </a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <a-select default-value="1">
              <a-select-option value="1">
                婚姻状况
              </a-select-option>
            </a-select>
          </a-col>

          <a-col>
            <a-select default-value="1">
              <a-select-option value="1">
                性别
              </a-select-option>
            </a-select>
          </a-col>

          <a-col>
            <a-input-number placeholder="最小年龄" :max="150" :min="0"/>
            <a-input-number placeholder="最大年龄" :max="150" :min="0"/>
          </a-col>
          <a-col>
            <a-range-picker class="datepick" :placeholder="['开始时间','结束时间']"></a-range-picker>
          </a-col>
          <a-col>
            <a-button type="primary" icon="search">搜索</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="[8,8]" style="padding:4px;">
          <a-col :span="12" :xs="24" :xl="12">
            <echart id="echartsdiv1-1" :data="option2" class="echart-c"></echart>
          </a-col>
          <a-col :span="12" :xs="24" :xl="12">
            <echart id="echartsdiv1-2" :data="option2" class="echart-c"></echart>
          </a-col>
        </a-row>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import echart from '@/components/echarts/echart'
  export default {
	created () {
  },
  components: {
      echart
    },
	data () {
	return {
    echartsDetailShow: false,
    option2: {
        title: {
          text: '参测人员籍贯分类统计'
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ],
        toolbox: { // 可视化的工具箱
                show: true,
                orient: 'vertical',
                showTitle: false,
                feature: {
                    dataView: { // 数据视图
                        show: true,
                        title: '数据视图'
                    },
                    restore: { // 重置
                        show: true,
                        title: '刷新'
                    },
                    dataZoom: { // 数据缩放视图
                        show: true,
                        title: '缩放'
                    },
                    saveAsImage: {// 保存图片
                        show: true,
                        title: '保存图片',
                        type: 'png'
                    }
                }
            }
        }
	}
	},

	methods: {
    routerToDetail () {
      // this.$router.push({ path: '/viewliangbiao' })
      this.echartsDetailShow = true
    }

  }
  }

</script>
<style scoped>
>>> .datepick .ant-input{
  width: 60%;
}

.echart-c{
  height:500px;
  border:1px solid #ddd;
  margin:5px;
  padding:20px 10px;
  border-radius:5px
}
</style>
