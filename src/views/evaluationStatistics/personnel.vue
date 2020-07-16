<template>
  <div>
    <a-row :gutter="[8,8]">
      <a-col :span="12" :xs="24" :xl="12">
        <!-- <div id="echartsdiv1" style="height:500px">
        </div> -->
        <echart id="echartsdiv1" :data="option1" style="height:500px"></echart>
      </a-col>
      <a-col :span="12" :xs="24" :xl="12">
        <echart id="echartsdiv2" :data="option2" style="height:500px"></echart>
      </a-col>
    </a-row>
    <a-row :gutter="[8,8]">
      <a-col :span="12" :xs="24" :xl="12">
        <echart id="echartsdiv3" :data="option2" style="height:500px"></echart>
      </a-col>
      <a-col :span="12" :xs="24" :xl="12">
        <echart id="echartsdiv4" :data="option2" style="height:500px"></echart>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import echart from '@/components/echarts/echart'
export default {
components: {
  echart
},
mounted () {
},
data () {
return {
  option1: {
        title: {
          text: '测评系统参测人员金字塔'
        },
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
        },
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
        ]
        }

}
},
methods: {
}
}

</script>
<style scoped>

</style>
