<template>
  <div class="tag-router">
    <div class="tag">
        <ul>
          <transition-group tag="li" mode="out-in" name="list">
            <router-link v-for="(item, index) in tagList" :to="item.path" :key="index">
              <i :class="$route.fullPath === item.path ? 'active' : ''"></i>
              <span>{{ item.name }}</span>
              <i class="el-icon-close close"></i>
            </router-link>
          </transition-group>
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
    console.log(this.$route)
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
      height: 37px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        a {
          height: 30px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: $border;
          padding: 4px;
          border-radius: 3px;
          margin-right: 10px;
          i {
            &:nth-child(1) {
              display: block;
              width: 15px;
              height: 15px;
              background: #e3e3e3;
              border-radius: 50%;
              margin-right: 5px;
              margin-left: 3px;
            }
            &.close {
              color: #fff;
              margin-left: 5px;
            }
            &.active {
              background: #f56336;
            }
          }
          span {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
