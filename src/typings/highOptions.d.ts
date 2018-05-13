declare namespace highChat {
  // options 的数据
  export interface hightOption {
    chart: optionchart,
    title: optiontitle,
    xAxis: optionxaxis,
    yAxis: optionyaxis,
    legend: optionlegend,
    tooltip: optiontooltip,
    plotOptions: optionsplot,
    series: seriseoption[],
    credits: creditsoption
  }

  export interface optionsplot {
    series: plotserise
  }

  export interface plotserise {
    borderWidth: number,
    dataLabels: dataservice,
    showInLegend?: boolean
  }

  export interface dataservice {
    enabled: boolean,
    format: string
  }

  export interface creditsoption {
    enabled: boolean
  }

  export interface seriseoption {
    name: string,
    colorByPoint: boolean,
    data: any
  }

  export interface optiontooltip {
    headerFormat: string,
    pointFormat: string
  }

  export interface optionlegend {
    enabled: boolean
  }

  export interface optionyaxis {
    title: optiontitle
  }

  export interface optionxaxis {
    type: string
  }
  
  export interface optiontitle {
    text: string,
    align ?: string
  }

  export interface optionchart {
    type: string,
    spacing: number[]
  }
}