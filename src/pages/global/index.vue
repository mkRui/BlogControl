<template>
  <div class="global" v-loading='loading'>
    <p class="iconfont blog-vertical">全局设置</p>
    <div class="globalBody">
      <div class="leftGlobal">
        <left-global ref="leftGlobal" :detailGlobal='detail'></left-global>
      </div>
      <div class="rightGlobal">
        <right-global @save='save' :detailGlobal='detail'></right-global>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import rightGlobal, { RightGlobal } from '@/components/global/rightGlobal.vue'
import leftGlobal, { JointUser, LeftGlobal } from '@/components/global/leftGlobal.vue'
import focus from './../../utils/foucs'
import { Global } from '@/store/module/global'
import { error } from '@/utils/message'


@Component({
  name: 'GlobalControl',
  directives: {
    focus
  },
  components: {
    rightGlobal,
    leftGlobal
  }
})
export default class GlobalControl extends Vue {
  public $refs: {
    leftGlobal: leftGlobal
  }

  private user: string = ''

  private loading = false

  private detail = JSON.parse('{}')

  private save (item: RightGlobal) {
    const saveDetail: any = {
      id: 1,
      ...item,
      ...this.$refs.leftGlobal.Global,
      codeCooperation: this.$refs.leftGlobal.userList.join(','),
      authorFace: this.$refs.leftGlobal.timg
    }
    let arr = []
    for (const elem in this.detail) {
      if (this.detail[elem] === saveDetail[elem]) {
        arr.push(true)
      } else {
        arr.push(false)
      }
    }
    if (arr.includes(false) || !this.detail) {
      this.$store.dispatch('global/editGlobal', saveDetail)
    } else {
      error('请修改一些内容')
    }
  }

  private async refresh () {
    this.loading = true
    await this.$store.dispatch('global/detailGlobal', {
      id: 1
    })
    this.detail = this.$store.state.global.global
    this.loading = false
  }

  private mounted () {
    this.refresh()
  }
}

</script>
<style lang='scss' scoped>
.global {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-width: 1100px;
  overflow: auto;
  > P {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    color: $border;
    &::before {
      margin-right: 5px;
    }
  }
  .globalBody {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .leftGlobal {
      width: 62%;
    }
    .rightGlobal {
      width: 35%;
    }
  }
}
</style>
