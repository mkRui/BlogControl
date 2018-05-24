<template>
  <div class="globalContainLeft">
    <div class="Introduction">
      <div class="userInfo">
        <ul>
          <li>
            <span>标语：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="titleBooean = false" v-if="titleBooean">{{ aboutTitle }}</span>
                <el-input :key="1" v-else v-focus @blur="titleBooean = true" v-model="aboutTitle"></el-input>
              </transition>
            </div>
          </li>
          <li>
            <span>合伙人：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="partnerBoolean = false" v-if="partnerBoolean">{{ partner }}</span>
                <el-input :key="1" v-else v-focus @blur="partnerBoolean = true" v-model="partner"></el-input>
              </transition>
            </div>
          </li>
          <li>
            <span>影视剧：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="movieBoolean = false" v-if="movieBoolean">{{ movie }}</span>
                <el-input :key="1" v-else v-focus @blur="movieBoolean = true" v-model="movie"></el-input>
              </transition>
            </div>
          </li>
          <li>
            <span>音乐：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="musicBoolean = false" v-if="musicBoolean">{{ music }}</span>
                <el-input :key="1" v-else v-focus @blur="musicBoolean = true" v-model="music"></el-input>
              </transition>
            </div>
          </li>
          <li>
            <span>爱好：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="hobbyBoolean = false" v-if="hobbyBoolean">{{ hobby }}</span>
                <el-input :key="1" v-else v-focus @blur="hobbyBoolean = true" v-model="hobby"></el-input>
              </transition>
            </div>
          </li>
          <li>
            <span>介绍：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="introduceBoolean = false" v-if="introduceBoolean">{{ introduce }}</span>
                <el-input :key="1" v-else v-focus @blur="introduceBoolean = true" v-model="introduce"></el-input>
              </transition>
            </div>
          </li>
        </ul>
      </div>
      <div class="userImg">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
          <img src="./../../../assets/image/123.jpg">
        </el-upload>
      </div>
    </div>
    <div class="feelings">
      <p>感情</p>
      <div class="feelHead">
        <span>标语标题：</span>
        <div>
          <transition  tag="div" name="slide-up" mode="out-in">
            <span :key="1" @click="feelHeadBoolean = false" v-if="feelHeadBoolean">{{ feelHead }}</span>
            <el-input :key="1" v-else v-focus @blur="feelHeadBoolean = true" v-model="feelHead"></el-input>
          </transition>
        </div>
      </div>
      <div class="feelHead">
        <span>标语副标题：</span>
        <div>
          <transition  tag="div" name="slide-up" mode="out-in">
            <span :key="1" @click="feelMinHeadBoolean = false" v-if="feelMinHeadBoolean">{{ feelMinHead }}</span>
            <el-input :key="1" v-else v-focus @blur="feelMinHeadBoolean = true" v-model="feelMinHead"></el-input>
          </transition>
        </div>
      </div>
      <div class="feelBody">
        <span>标语内容：</span>
        <div>
          <transition  tag="div" name="slide-up" mode="out-in">
            <span :key="1" @click="feelBodyBoolean = false" v-if="feelBodyBoolean">{{ feelBody }}</span>
            <el-input :key="1" v-else v-focus @blur="feelBodyBoolean = true" type="textarea" v-model="feelBody"></el-input>
          </transition>
        </div>
      </div>
    </div>
    <div class="joint">
      <p>联合开发人</p>
      <div class="user">
        <span>开发人昵称：</span>
        <div class="userList">
          <el-tag
            v-for="(tag, index) in userList"
            :key="index"
            @close='deleteUser(tag, index)'
            closable>
            {{tag.userName}}
          </el-tag>
        </div>
        <el-popover
          placement="left"
          v-model="addUserJoint">
          <div class="addUser">
            <el-input placeholder="请输入开发人名称" v-model="Joint"></el-input>
            <el-button type="primary" @click="addJoint">添加</el-button>
          </div>
          <el-button slot="reference" type="primary" >添加开发人</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'

import focus from './../../../utils/foucs'

interface user {
  userName: string
}

@Component({
  directives: {
    focus
  }
})
export default class leftGlobal extends Vue {
  private aboutTitle: string = 'Hi Guy'

  private titleBooean: boolean = true

  private partner: string = '聪sir 帅sir'

  private partnerBoolean: boolean = true

  private movie: string = '猫鼠游戏'

  private movieBoolean: boolean = true

  private music: string = '女朋友'

  private musicBoolean: boolean = true

  private hobby: string = '看电影 and 编程'

  private hobbyBoolean: boolean = true

  private introduce: string = 'web Engineer is me'

  private introduceBoolean: boolean = true

  private feelHead: string = 'Hello Everyone'

  private feelHeadBoolean: boolean = true

  private feelMinHead: string = 'hi welcome to our blog'

  private feelMinHeadBoolean: boolean = true

  private feelBody: string = '这是我和朋友们一起写的博客，我们非常喜欢技术带来的便利和这种酷的感觉，在书写的过程中受到了很多人的建议以便我们能向跟好的方向修改～，在这个过程中我们更能感受到自己技能的提升，我们对此充满喜悦，同时也欢迎各位来此留言让我们共同成长！最后 以梦想为名（In the name of dreams）'

  private feelBodyBoolean: boolean = true

  private userList: user[] = [{ userName: '聪sir' }, { userName: '帅sir' }, { userName: '聪si' }, { userName: '帅si' }]

  private addUserJoint: boolean = false

  private Joint: string = ''

  private addJoint (): void {
    this.addUserJoint = false
    this.userList.push({
      userName: this.Joint
    })
    this.Joint = ''
  }

  private deleteUser (tag:user, index: number ): void {
    this.userList.splice(index, 1)
  }

}

</script>
<style lang='scss'>
.globalContainLeft {
  width: 100%;
  .Introduction {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    .userInfo {
      width: 60%;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 54px;
          padding: 10px;
          background: #fff;
          border-radius: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          > span:nth-child(1) {
            font-size: 15px;
            margin-right: 5px;
            margin-left: 10px;
          }
          div {
            width: 70%;
            div {
              width: 100%;
            }
          }
        }
      }
    }
    .userImg {
      width: 35%;
      padding: 10px;
      display: flex;
      align-items: center;
      margin-right: 2%;
      img {
        width: 100%;
      }
    }
  }
  .feelings {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    margin-top: 20px;
    > p {
      margin-bottom: 10px;
    }
    .feelHead {
      width: 100%;
      height: 54px;
      background: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      > span:nth-child(1) {
        font-size: 15px;
        margin-right: 5px;
        margin-left: 10px;
      }
      div {
        width: 70%;
        div {
          width: 100%;
        }
      }
    }
    .feelBody {
      width: 100%;
      background: #fff;
      border-radius: 5px;
      display: flex;
      box-sizing: border-box;
      margin-top: 20px;
      > span:nth-child(1) {
        font-size: 15px;
        margin-right: 5px;
        margin-left: 10px;
      }
      div {
        width: 70%;
        div {
          width: 100%;
          textarea {
            height: 95px;
          }
        }
      }
    }
  }
  .joint {
    width: 100%;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    > p {
      margin-bottom: 10px;
    }
    .user {
      display: flex;
      justify-content: space-around;
      align-items: center;
      > span {
        font-size: 15px;
      }
      div {
        width: 60%;
        border: 1px solid $border;
        border-radius: 5px;
        span {
          margin: 4px;
        }
      }
    }
  }
}
.addUser {
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    margin-right: 10px;
  }
}
</style>
