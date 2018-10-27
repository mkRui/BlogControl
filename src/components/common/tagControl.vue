<template>
  <div class="tag-control">
    <div class="switch">
      <i class="el-icon-caret-left"></i>
      <i class="el-icon-caret-right"></i>
    </div>
    <div class="tag-body">
      <tag></tag>
    </div>
    <div class="dropDown">
      <el-dropdown>
        <div class="drop">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭所有</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import tag from './tag.vue'
@Component({
  name: 'tagControl',
  components: {
    tag
  }
})
export default class tagControl extends Vue {

}
</script>
<style lang='scss'>
.tag-control {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .switch {
    min-width: 80px;
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    i {
      display: block;
      text-align: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      margin: 0px 5px;
      background: $border;
      color: #fff;
    }
  }
  .tag-body {
    width: 100%;
  }
  .dropDown {
    width: 40px;
    display: flex;
    background: $border;
    border-radius: 0px 0px 0px 30px;
    i {
      color: #fff;
      margin-left: 15px;
      margin-top: 10px;
    }
  }
}
</style>
