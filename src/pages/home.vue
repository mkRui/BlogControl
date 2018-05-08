<template>
  <div class="home">
    <header class="header">
      <div class="logo">
        <img src="./../assets/image/control.png">
        <span>{{ homeTitle }}</span>
      </div>
      <div class="user">
        <img :src="userFace">
        <span>师聪瑞</span>
      </div>
    </header>
    <main>
      <div class="sidebar"></div>
      <div></div>
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

declare function require(string: any): string;

@Component
export default class Home extends Vue {
  private user: object = {}
  private homeTitle: string = 'Qzuser </ 瑞>'
  private userFace = require('./../assets/image/people.jpeg')
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
        border-radius: 50%;
      }
    }
  }
  main {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    justify-content: flex-start;
    .sidebar {
      width: 250px;
      background: $border;

    }
  }
}
</style>
