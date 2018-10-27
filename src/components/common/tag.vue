<template>
  <div class="tag-router">
    <div class="tag">
      <ul>
        <li v-for="(item, index) in tagList" :key="index">
          <i></i>
        </li>
      </ul>
    </div>
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
    this.$store.dispatch('tagControl/AddTag', to)
  }

  private get tagList () {
    return this.$store.state.tagControl.tagList
  }

  private mounted () {
    console.log(this.$store.state)
  }
}
</script>
<style lang='scss'>
.tag-router {
  width: 100%;
  .tag {
    width: 100%;
    ul {
      width: 100%;
      height: 39px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li {
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: $border;
        padding: 4px;
        i {
          display: block;
          width: 15px;
          height: 15px;
          background: #e3e3e3;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
