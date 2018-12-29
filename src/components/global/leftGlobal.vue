<template>
  <div class="globalContainLeft">
    <div class="Introduction">
      <div class="userInfo">
        <ul>
          <li @click="titleBooean = false">
            <span>标语：</span>
            <div >
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" v-if="titleBooean">{{ Global.title }}</span>
                <el-input :key="1" v-else v-focus @blur="titleBooean = true" v-model="Global.title"></el-input>
              </transition>
            </div>
          </li>
          <li @click="partnerBoolean = false">
            <span>合伙人：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1"  v-if="partnerBoolean">{{ Global.cooperation }}</span>
                <el-input :key="1" v-else v-focus @blur="partnerBoolean = true" v-model="Global.cooperation"></el-input>
              </transition>
            </div>
          </li>
          <li @click="movieBoolean = false">
            <span>影视剧：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" @click="movieBoolean = false" v-if="movieBoolean">{{ Global.movie }}</span>
                <el-input :key="1" v-else v-focus @blur="movieBoolean = true" v-model="Global.movie"></el-input>
              </transition>
            </div>
          </li>
          <li @click="musicBoolean = false">
            <span>音乐：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1"  v-if="musicBoolean">{{ Global.music }}</span>
                <el-input :key="1" v-else v-focus @blur="musicBoolean = true" v-model="Global.music"></el-input>
              </transition>
            </div>
          </li>
          <li @click="hobbyBoolean = false">
            <span>爱好：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1" v-if="hobbyBoolean">{{ Global.hobby }}</span>
                <el-input :key="1" v-else v-focus @blur="hobbyBoolean = true" v-model="Global.hobby"></el-input>
              </transition>
            </div>
          </li>
          <li @click="introduceBoolean = false">
            <span>介绍：</span>
            <div>
              <transition  tag="div" name="slide-up" mode="out-in">
                <span :key="1"  v-if="introduceBoolean">{{ Global.introduce }}</span>
                <el-input :key="1" v-else v-focus @blur="introduceBoolean = true" v-model="Global.introduce"></el-input>
              </transition>
            </div>
          </li>
        </ul>
      </div>
      <div class="userImg">
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :show-file-list='false'
          name='fileName'
          :before-upload='before'
          :on-success="success">
          <img :src="timg ? timg : userFace">
        </el-upload>
      </div>
    </div>
    <div class="feelings">
      <p>感情</p>
      <div class="feelHead" @click="feelHeadBoolean = false">
        <span>标语标题：</span>
        <div>
          <transition  tag="div" name="slide-up" mode="out-in">
            <span :key="1" v-if="feelHeadBoolean">{{ Global.feelingsTitle }}</span>
            <el-input :key="1" v-else v-focus @blur="feelHeadBoolean = true" v-model="Global.feelingsTitle"></el-input>
          </transition>
        </div>
      </div>
      <div class="feelHead" @click="feelMinHeadBoolean = false">
        <span>标语副标题：</span>
        <div>
          <transition  tag="div" name="slide-up" mode="out-in">
            <span :key="1"  v-if="feelMinHeadBoolean">{{ Global.feelingsMinTitle }}</span>
            <el-input :key="1" v-else v-focus @blur="feelMinHeadBoolean = true" v-model="Global.feelingsMinTitle"></el-input>
          </transition>
        </div>
      </div>
      <div class="feelBody" @click="feelBodyBoolean = false">
        <span>标语内容：</span>
        <div>
          <transition  tag="div" name="slide-up" mode="out-in">
            <span :key="1"  v-if="feelBodyBoolean">{{ Global.feelingsContent }}</span>
            <el-input :key="1" v-else v-focus @blur="feelBodyBoolean = true" type="textarea" v-model="Global.feelingsContent"></el-input>
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
            {{tag}}
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
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import focus from '@/utils/foucs'
import { error } from '@/utils/message'
import { contentPath } from '@/config'
import { Global } from '@/store/module/global'


export interface JointUser {
  userName: string
}

export interface LeftGlobal {
  title: string,
  cooperation: string,
  movie: string,
  music: string,
  hobby: string,
  introduce: string,
  feelingsTitle: string,
  feelingsMinTitle: string,
  feelingsContent: string
}

@Component({
  name: 'leftGlobal',
  directives: {
    focus
  }
})
export default class leftGlobal extends Vue {
  public Global: LeftGlobal = JSON.parse('{}')

  public userList: string[] = []

  private userFace = require('./../../assets/image/people.jpeg')

  public timg = ''

  @Prop({ default: () => JSON.parse('{}') })
  private detailGlobal: Global

  private titleBooean: boolean = true

  private partnerBoolean: boolean = true

  private movieBoolean: boolean = true

  private musicBoolean: boolean = true

  private hobbyBoolean: boolean = true

  private introduceBoolean: boolean = true

  private feelHeadBoolean: boolean = true

  private feelMinHeadBoolean: boolean = true

  private feelBodyBoolean: boolean = true


  private addUserJoint: boolean = false

  private Joint: string = ''

  private addJoint (): void {
    this.addUserJoint = false
    this.userList.push(this.Joint)
    this.Joint = ''
  }

  private get actionUrl () {
    return contentPath + `/article/uploadImg`
  }

  private before (item: File) {
    const reg = /(.jpg|.JPG|.jpeg|.JPEG|.png|.PNG)$/
    if (!reg.test(item.name)) {
      error('请上传jpg、jpeg、png类型的图片')
      return false
    }
  }

  private success (item: ajaxRes.reState) {
    if (item.code === 1) {
      this.timg = item.result.filePath
    }
  }

  private deleteUser (tag: string, index: number ): void {
    this.userList.splice(index, 1)
  }

  @Watch('detailGlobal', {deep: true})
  private updateDetailGlobal () {
    if (JSON.stringify(this.detailGlobal) !== '{}') {
      const detail = this.detailGlobal
      this.Global = {
        title: detail.title,
        cooperation: detail.cooperation,
        movie: detail.movie,
        music: detail.music,
        hobby: detail.hobby,
        introduce: detail.introduce,
        feelingsTitle: detail.feelingsTitle,
        feelingsMinTitle: detail.feelingsMinTitle,
        feelingsContent: detail.feelingsContent
      }
      this.userList = detail.codeCooperation.split(',')
      this.timg = detail.authorFace
    }
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
        height: 42px;
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
