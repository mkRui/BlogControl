<template>
  <div id="app">
    <transition name="list" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'App'
})
export default class App extends Vue {
  private mounted () {
    this.$store.dispatch('getInit')
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
