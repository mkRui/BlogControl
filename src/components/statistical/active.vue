<template>
  <div class='active'>
    <p><img src="@/assets/image/actives.png">文章活跃度</p>
    <div id="activePie"></div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HighCharts from 'highcharts'

@Component
export default class articleList extends Vue{
  private options: highChat.hightOption = {
        chart: {
          type: 'pie',
          spacing: [90, 30, 80, 30]
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: '数量',
            align: 'high'
          }
        },
        legend: {
          enabled: true
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>浏览量<br/>'
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
          }
        },
        series: [{
          name: '文章活跃度：',
          colorByPoint: true,
          data: [
            ['web前端进阶', 45],
						['python人工智能', 26],
						['java web', 8],
						['react 组件化', 6],
						['typescript 强类型', 6]
					]
        }],
        credits: {
          enabled: false
        }
      }
  private mounted (): void {
    HighCharts.chart('activePie', this.options)
  }
}

</script>
<style lang='scss' scoped>
.active {
  width: 100%;
  height: 500px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  p {
    position: absolute;
    top: 20px;
    left: 0px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
      margin-left: 20px;
    }
  }
  #activePie {
    height: 500px;
  }
}
</style>