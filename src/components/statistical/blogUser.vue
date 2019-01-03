<template>
  <div class="blogAdmin">
    <p><img src="@/assets/image/admin.png">管理员</p>
    <div class="user" v-for="(item, index) in userList" :key="index">
      <img v-if="item.userFace" :src="item.userFace">
      <img v-else src="@/assets/image/people.jpeg">
      <span> {{ item.nickName }} </span>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

interface user {
  urlFace: string,
  name: string
}

@Component
export default class blogUser extends Vue {
  private userList = []

  private async mounted () {
    await this.$store.dispatch('user/getUserPage', {
      pageNo: 1,
      pageSize: 20
    })
    this.userList = this.$store.state.user.userList
  }
}
</script>
<style lang='scss' scoped>
.blogAdmin {
  width: 100%;
  height: 309px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;
  p {
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 25px;
      margin-left: 10px;
      margin-right: 5px;
    }
  }
  .user {
    width: 70px;
    height: 70px;
    margin-top: 10px;
    text-align: center;
    float: left;
    margin-right: 5px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #E3E3E3;
    }
    span {
      margin-top: 5px;
      display: block;
    }
  }
}
</style>
