<template>
  <div class="tag-router" ref="tagControl" >
    <div class="tag" ref="tagBody" :style="{left: -left + 'px'}" name="list">
      <transition-group name='list' tag="span" mode="out-in">
          <router-link v-for="(item, index) in tagList" class="tagLink" ref='tag' :key="index"  :to="item.path" >
            <i :class="$route.fullPath === item.path ? 'active' : ''"></i>
            <span>{{ item.name }}</span>
            <i v-if="item.path !== '/statistical'" @click.prevent="close(item.path)" class="el-icon-close close"></i>
          </router-link>
        </transition-group>
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
  public $refs: {
    [item: string]: any
  }

  private left = 0

  @Watch('$route', { deep: true, immediate: true })
  private updateRoute (to: Route, form: Route) {
    this.$store.dispatch('tagControl/AddTag', to)
    this.$nextTick(() => {
      const tag = this.$refs.tag
      let el
      for (const item of tag) {
        if ((item as any).to === to.fullPath) {
          el = item.$el
        }
      }
      this.tagMove(el)
    })
  }

  private get tagList () {
    return this.$store.state.tagControl.tagList
  }

  private async close (item: string) {
    await this.$store.dispatch('tagControl/closeTag', item)
    if (!this.tagList.length) {
      this.$router.push('/statistical')
    } else {
      const url = this.tagList.slice(-1)[0].path
      this.$router.push(url)
    }
  }

  public leftMove () {
    const tagControl = this.$refs.tagControl.offsetWidth
    const control = this.left + this.$refs.tagBody.offsetWidth
    if (control > tagControl) {
      this.left = Math.min(this.$refs.tagBody.offsetWidth - tagControl, this.left += 30)
    }
  }

  public rightMove () {
    const control = this.left + this.$refs.tagBody.offsetWidth
    const tagControl = this.$refs.tagControl.offsetWidth
    if (control > tagControl) {
      this.left = Math.max(0, this.left -= 30)
    }
  }

  // tag 移动
  private tagMove (el: HTMLElement) {
    const location = el.offsetLeft + el.offsetWidth
    const control = this.left + this.$refs.tagBody.offsetWidth
    const tagControl = this.$refs.tagControl.offsetWidth
    if (control > tagControl) {
      if (location > this.left && el.offsetLeft < this.left || location < this.left) {
        this.left = Math.min(el.offsetLeft, 0)
      } else if (el.offsetLeft > this.left && location <= tagControl - this.left) {
        console.log('此时标签在中间')
      } else {
        this.left = Math.min(location - (tagControl - this.left), this.$refs.tagBody.offsetWidth - tagControl)
      }
    }
  }

  private mounted () {
  }
}
</script>
<style lang='scss'>
.tag-router {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .tag {
    top: 0px;
    left: 0px;
    position: absolute;
    height: 100%;
    white-space: nowrap;
    transition: .35s;
    .tagLink {
      display: inline-flex;
      justify-content: space-around;
      align-items: center;
      background: $border;
      padding: 4px;
      border-radius: 1px;
      margin: 0px 5px;
      margin-top: 5px;
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
</style>
