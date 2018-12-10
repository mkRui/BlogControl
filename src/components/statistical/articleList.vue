<template>
  <div class='articale'>
    <p><img src="@/assets/image/submit.png">  个人文章发布数</p>
    <div id="articleList"></div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HighCharts from 'highcharts'

@Component
export default class articleList extends Vue{
  private options: highChat.hightOption = {
        chart: {
          type: 'bar',
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
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>篇<br/>'
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
          }
        },
        series: [{
          name: '个人发布数',
          colorByPoint: true,
          data: [{
            name: 'qzuser',
            y: 56,
            drilldown: 'Microsoft Internet Explorer'
          }, {
            name: 'Gqzu',
            y: 24,
            drilldown: 'Chrome'
          }, {
            name: '文',
            y: 10,
            drilldown: ''
          }, {
            name: '章',
            y: 42,
            drilldown: 'Safari'
          }, {
            name: '发',
            y: 40,
            drilldown: 'Opera'
          }, {
            name: '布',
            y: 20,
            drilldown: null
          }]
        }],
        credits: {
          enabled: false
        }
      }
  private async mounted () {
    await this.$store.dispatch('statistical/getUserSubmit')
    this.options.series[0].data = this.$store.state.statistical.readArticle
    HighCharts.chart('articleList', this.options)
  }
}

</script>
<style lang='scss' scoped>
.articale {
  width: 100%;
  background: #fff;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
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
  #articleList {
    height: 350px;
  }
}
</style>
