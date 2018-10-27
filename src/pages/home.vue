<template>
  <div class="home">
    <header class="header">
      <div class="logo">
        <img src="./../assets/image/control.png">
        <span>{{ homeTitle }}</span>
      </div>
      <div class="user">
        <img :src="userFace">
        <span>anRui</span>
      </div>
    </header>
    <main>
      <div class="sidebar">
        <el-menu
          class="menu"
          @select="selectChange"
          :default-active="$route.path"
          background-color="#434348"
          text-color="#fff"
          active-text-color="#ffd04b">
          <template  v-for="(item, index) in $router.options.routes">
            <el-menu-item v-if="item.name ? item.children.length > 1 ? false : true : false" :key="index" :index="item.children[0].path">
              <img class="icon_img" :src="item.children[0].meta.icon">
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
            <el-submenu v-if="item.name ? item.children.length > 1 ? true : false : false" :key="index" :index="item.children[0].path">
            <template slot="title">
              <img class="icon_img" :src="item.meta.icon">
              <span>{{ item.name }}</span>
            </template>
              <el-menu-item v-for="(items, indexs) in item.children" :key="indexs" :index="items.path + ''">
                <img class="icon_img" :src="items.meta.icon">
                <span slot="title">{{ items.name }}</span>
              </el-menu-item>
          </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="mainBody">
        <div class="tagtang">
          <tag></tag>
        </div>
        <div class="main">
          <transition name="list" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import service from './../api/index'
import tag from '@/components/common/tagControl.vue'

@Component({
  name: 'home',
  components: {
    tag
  }
})
export default class Home extends Vue {
  private user: object = {}
  private homeTitle: string = 'anRui'
  private userFace = require('./../assets/image/people.jpeg')

  private selectChange (key:string, keyPath:string):void {
    this.$router.push(key)
  }

  private mounted (): void {
    service.init()
  }
}
</script>
<style lang='scss' scoped>
.home {
  width: 100vw;
  height: 100vh;
  header {
    width: 100%;
    height: 70px;
    background: $border;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    .logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #fff;
        font-size: 27px;
      }
      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #fff;
        font-size: 16px;
      }
      img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
        border-radius: 50%;    }
      }
    }
    main {
      width: 100%;
      height: calc(100% - 70px);
      display: flex;
      justify-content: flex-start;
      .sidebar {
        width: 200px;
        background: $border;
        overflow: hidden;
        > ul {
          width: 251px;
          li {
            width: 200px;
          }
        }
        .icon_img {
          width: 20px;
          margin-right: 5px;
          margin-left: -3px;
        }
        .menu {
          width: 100%;
        }
      }
      .mainBody {
        width: calc(100% - 200px);
        height: 100%;
        overflow: auto;
        .tagtang {
          width: 100%;
          height: 40px;
          background: #fff;
          border: 1px solid #e3e3e3;
        }
        .main {
          width: 100%;
          height: calc(100% - 60px)
        }
      }
    }
  }
</style>
