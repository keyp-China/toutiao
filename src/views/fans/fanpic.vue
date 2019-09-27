<template>
  <el-card class="fanspic">
    <bread-crumb slot="header">
      <template slot="title">粉丝画像</template>
    </bread-crumb>
    <fans-menu></fans-menu>
    <el-row class="sex-header">
      <div class="left">粉丝性别分布</div>
      <div class="right">
        <span style="color:#409EFF;font-size:20px">■</span>
        男 (43%)&nbsp;
        <span style="color:#fa8665;font-size:20px">■</span>
        女 (57%)
      </div>
    </el-row>
    <el-row>
      <el-progress :text-inside="true" :stroke-width="30" :percentage="43"></el-progress>
    </el-row>

    <!-- 图表1 -->
    <div style="margin-top:20px">粉丝年龄分布</div>
    <div id="ECharts-one" style="width:1200px;height:400px;"></div>

    <el-row class="terminal-header">
      <div class="left">粉丝终端分布</div>
      <div class="right">
        <span style="color:#409EFF;font-size:20px">■</span>
        安卓 (69%)&nbsp;
        <span style="color:#fa8665;font-size:20px">■</span>
        IOS (31%)
      </div>
    </el-row>
    <el-row>
      <el-progress :text-inside="true" :stroke-width="30" :percentage="69"></el-progress>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ECharts-one'))
    // 指定图表的配置项和数据
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '6%',
        right: '15%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['0-18', '19-23', '24-30', '31-40', '41-50', '51-60', '61+'],
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
          data: [10, 320, 280, 134, 190, 30, 20]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.fanspic /deep/ .el-progress-bar__outer {
  background-color: #fa8665 !important;
}
.fanspic /deep/ .el-progress-bar__inner {
  border-radius: 0px !important;
}
.sex-header,
.terminal-header {
  margin: 20px 0;
  div {
    display: inline-block;
    width: 50%;
  }
  .right {
    text-align: right;
  }
}
</style>
