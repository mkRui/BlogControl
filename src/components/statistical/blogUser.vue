<template>
  <div class="blogAdmin">
    <p><img src="@/assets/image/admin.png">管理员</p>
    <div class="user" v-for="(item, index) in userList" :key="index">
      <img v-if="item.urlFace" :src="item.urlFace">
      <img v-else src="@/assets/image/people.jpeg">
      <span> {{ item.name }} </span>
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
  private userList:user[] = [
    {urlFace: '', name: 'qzuser'},
    {urlFace: 'http://www.scrscript.com/static/1.png', name: '绿茶'},
    {urlFace: 'http://img1.imgtn.bdimg.com/it/u=1225487921,1872767937&fm=214&gp=0.jpg', name: '毽子'},
    {urlFace: 'http://www.scrscript.com/static/123.jpg', name: 'hey'},
    {urlFace: 'http://www.ld12.com/upimg358/allimg/20160629/082344384222015.jpg', name: '光头'},
    {urlFace: 'http://up.qqya.com/allimg/201710-t/17-101804_129240.jpg', name: '码农'},
    {urlFace: 'http://www.qqzhi.com/uploadpic/2014-10-19/231433434.jpg', name: '阿猿'},
    {urlFace: 'http://f1.topitme.com/1/1f/03/113057198949c031f1l.jpg', name: '小强'},
    {urlFace: 'http://www.scrscript.com/static/timg.jpeg', name: 'isavin'},
  ]
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
