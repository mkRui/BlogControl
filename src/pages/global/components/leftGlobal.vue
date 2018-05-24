<template>
  <div class="globalContainLeft">
    <div class="Introduction">
      <div class="userInfo"></div>
      <div></div>
    </div>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'
@Component
export default class leftGlobal extends Vue {

}

</script>
<style lang='scss' scoped>
.globalContainLeft {
  width: 100%;
  .Introduction {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
  }
}
</style>

