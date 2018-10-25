<template>
  <div class="tag-router">
    
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
@Component({
  name: 'tagRouter'
})
export default class TagRouter extends Vue {
  @Watch('$route', { deep: true, immediate: true })
  private updateRoute (to: Route, form: Route) {
    console.log(to)
  }
}
</script>
<style>

</style>
