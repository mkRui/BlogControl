<template>
  <div class="canvas">
    <div v-show="canvasCons"></div>
    <canvas ref="canvasCon" id="Mycanvas"></canvas>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'CanvasLogin'
})
export default class CanvasLogin extends Vue {
  public $refs: {
    canvasCon: HTMLCanvasElement
  }

  private circleArr: any[] = []

  private WIDTH = window.innerWidth

  private HEIGHT = window.innerHeight

  private POINT = 35

  private canvasLogin: any

  private context: CanvasRenderingContext2D | any

  private canvasCons = true

  
  //线条：开始xy坐标，结束xy坐标，线条透明度
  private Line (x: number, y: number, _x: number, _y: number, o: number) {
    return {
      beginX: x,
      beginY: y,
      closeX: _x,
      closeY: _y,
      o: o
    }
  }

  //点：圆心xy坐标，半径，每帧移动xy的距离
  private Circle (x: number, y: number, r: number, moveX: number, moveY: number) {
    return {
      x: x,
      y: y,
      r: r,
      moveX: moveX,
      moveY: moveY
    }
  }

  // 绘制原点
  private drawCricle (cxt: any, x: any, y: any, r: any, moveX?: any, moveY?: any) {
    var circle = this.Circle(x, y, r, moveX, moveY)
    cxt.beginPath()
    cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
    cxt.closePath()
    cxt.fill();
    return circle;
  }
  
  //绘制线条
  private drawLine (cxt: any, x: any, y: any, _x: any, _y: any, o: any) {
    var line = this.Line(x, y, _x, _y, o)
    cxt.beginPath()
    cxt.strokeStyle = 'rgba(0,0,0,'+ o +')'
    cxt.moveTo(line.beginX, line.beginY)
    cxt.lineTo(line.closeX, line.closeY)
    cxt.closePath()
    cxt.stroke();
  }

  //生成max和min之间的随机数
  private num (max: number, _min?: number) {
    var min = _min || max
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  // 初始化
  private init () {
    const circleArr = this.circleArr;
    for (var i = 0; i < this.POINT; i++) {
      circleArr.push(this.drawCricle(this.context, this.num(this.WIDTH), this.num(this.HEIGHT), this.num(15, 2), this.num(10, -10)/40, this.num(10, -10)/40));
    }
    this.draw();
  }

    //每帧绘制
  private draw () {
    this.context.clearRect(0, 0, this.canvasLogin.width, this.canvasLogin.height);
    for (var i = 0; i < this.POINT; i++) {
      this.drawCricle(this.context, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i].r);
    }
    for (var i = 0; i < this.POINT; i++) {
      for (var j = 0; j < this.POINT; j++) {
        if (i + j < this.POINT) {
          var A = Math.abs(this.circleArr[i+j].x - this.circleArr[i].x)
          var B = Math.abs(this.circleArr[i+j].y - this.circleArr[i].y);
          var lineLength = Math.sqrt(A*A + B*B);
          var C = 1 / lineLength * 7 - 0.009;
          var lineOpacity = C > 0.03 ? 0.03 : C;
          if (lineOpacity > 0) {
            this.drawLine(this.context, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i+j].x, this.circleArr[i+j].y, lineOpacity);
          }
        }
      }
    }
  }

  private mounted () {
    this.canvasLogin = this.$refs.canvasCon
    this.context = this.canvasLogin.getContext('2d')
    this.canvasLogin.width = this.WIDTH
    this.canvasLogin.height = this.HEIGHT
    this.context.strokeStyle = 'rgba(0,0,0,0.02)',
    this.context.strokeWidth = 1,
    this.context.fillStyle = 'rgba(0,0,0,0.05)'
    this.$nextTick(() => {
      const _this = this
      this.init();
      setInterval(function () {
        for (var i = 0; i < _this.POINT; i++) {
          var cir = _this.circleArr[i];
          cir.x += cir.moveX;
          cir.y += cir.moveY;
          if (cir.x > _this.WIDTH) cir.x = 0;
          else if (cir.x < 0) cir.x = _this.WIDTH;
          if (cir.y > _this.HEIGHT) cir.y = 0;
          else if (cir.y < 0) cir.y = _this.HEIGHT;
        }
        _this.draw();
      }, 1);
      setTimeout(() => {
        _this.canvasCons = false
      }, 8000)
    })
  }

}
</script>
<style lang='scss'>
.canvas {
  width: 100vw;
  height: 100vh;
  div {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
  }
}
</style>
