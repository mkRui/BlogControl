<template>
  <div class="global">
    <p class="el-icon-star-off">全局设置</p>
    <div class="globalBody">
      <div class="leftGlobal">
        <left-global @Global='Global' @userList='userList'></left-global>
      </div>
      <div class="rightGlobal">
        <right-global @save='save'></right-global>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

interface user {
  userName: string
}

interface Global {
  aboutTitle: string,
  partner: string,
  movie: string,
  music: string,
  hobby: string,
  introduce: string,
  feelHead: string,
  feelMinHead: string,
  feelBody: string,
}

import { Component, Vue } from 'vue-property-decorator'

import rightGlobal from './components/rightGlobal.vue'

import leftGlobal from './components/leftGlobal.vue'

import focus from './../../utils/foucs'

@Component({
  directives: {
    focus
  },
  components: {
    rightGlobal,
    leftGlobal
  }
})

export default class global extends Vue {

  private user: string = ''

  private save () {
  }

  private Global (item: Global) {
  }

  private userList (item: user[]) {
  }

  private mounted () {
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
    margin-bottom: 20px;
    color: $border;
    &::before {
      margin-right: 5px;
    }
    &::after {
      margin-top: 5px;
      content: " ";
      display: block;
      width: 110px;
      height: 2px;
      background-color: $border;
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
