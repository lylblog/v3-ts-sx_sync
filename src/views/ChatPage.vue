<template>
  <div id="chat-box">
    <div class="header">
      <span style="float: left;">知心姐姐</span>
      <span style="float: right;"></span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in infoList" :key="index">
        <div v-if="item.isMe">
          <img src="../assets/images/right.png" alt="" class="imgright"><span class="spanright">{{ item.msg }}</span>
        </div>

        <div v-else>
          <img src="../assets/images/left.png" alt="" class="imgleft"><span class="spanleft">{{ item.msg }}</span>
        </div>

      </li>
    </ul>
    <div class="footer">
      <div id="user_face_icon">
        <img src="../assets/images/right.png" alt="" />
      </div>
      <input id="text" type="text" @keyup.enter="chat" v-model.trim="inputMsg" placeholder="说点什么吧..." />
      <span id="btn" @click="chat">发送</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import axios from 'axios'
interface InfoList {
  msg: string;
  isMe: boolean;
}
export default defineComponent({

  setup() {
    // 输入的内容
    let inputMsg = ref("");
    // 数组列表
    const infoList = ref<Array<InfoList>>([{ msg: '你好', isMe: true }, { msg: '你也好', isMe: false }]);
    let content = ref<HTMLElement | null>(null);
    // 定义chat
    const chat: () => void = async () => {
      // 非空判断
      if (inputMsg.value === "") {
        alert("写点啥");
        return;
      }
      // 自己的内容
      infoList.value.push({
        isMe: true,
        msg: inputMsg.value,
      });
      const tmpMsg = inputMsg.value
      inputMsg.value = ''
      try {
        let res = await axios.get(`https://api.ownthink.com/bot?spoken=${tmpMsg}`);
        console.log(res);
        if (res.data.message == 'success') {
          console.log(res.data.data.info.text);
          // 使用解构赋值获取其中的信息
          const { data: { data: { info: { text: respMsg } } } } = res;
          // const respMsg = res.data.data.info.text
          infoList.value.push({
            msg: respMsg,
            isMe: false,
          })
        }
        nextTick(() => {
          content.value ? content.value.scrollTo(0, 9999999) : null
        });
        // 接口访问成功则压缩数据进系统
      } catch (error) {
        console.log(error);
        infoList.value.push({
          isMe: false,
          msg: "知心姐姐断线了,正在连接中……",
        });
      }
      // 将input框清空

      // 
    };
    return {
      chat,
      inputMsg,
      infoList
    };
  }
})
</script>

<style scoped lang="scss">
#chat-box {
  position: relative;
  width: 350px;
  background-color: pink;
  height: calc(100vh - 100px);
  //background: #eee;
  margin: 0 auto;

  // box-shadow: 20px 20px 55px #777;
  // border-radius: 0 0 5px 5px;

  .header {
    background: #000;
    height: 50px;
    color: #fff;
    line-height: 40px;
    font-size: 18px;
    padding: 0 10px;
    border-radius: 5px 5px 0 0;
  }

  .footer {
    position: absolute;
    width: 330px;
    height: 40px;
    background: #666;
    bottom: 0;

    padding: 10px;
    border-radius: 0 0 5px 5px;
    font-size: 16px;

    input {
      width: 185px;
      height: 45px;
      outline: none;
      font-size: 16px;
      text-indent: 10px;
      position: absolute;
      border-radius: 6px;
      right: 80px;
    }

    span {
      display: inline-block;
      width: 62px;
      height: 48px;
      background: #ccc;
      font-weight: 900;
      line-height: 45px;
      cursor: pointer;
      text-align: center;
      position: absolute;
      right: 10px;
      border-radius: 6px;

      &:hover {
        color: #fff;
        background: #999;
      }
    }

    #user_face_icon {
      display: inline-block;
      background: red;
      width: 50px;
      height: 50px;
      border-radius: 30px;
      position: absolute;
      bottom: 4px;
      left: 14px;
      cursor: pointer;
      overflow: hidden;

      img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }
    }

  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    background: #f7f7f9;
    width: 0;
  }

  .content {
    width: 350px;
    height: 78vh;
    overflow: auto;
    //scrollbar-width: none;
    font-size: 20px;
    // background-color: #777;
    word-wrap: break-word;
    text-align: justify;
    padding-bottom: 40px;

    li {
      margin-top: 10px;
      padding-left: 10px;
      width: 320px;
      display: block;
      clear: both;
      overflow: hidden;

      img {
        float: left;
      }

      span {
        background: #7cfc00;
        padding: 10px;
        border-radius: 10px;
        float: left;
        margin: 6px 10px 0 10px;
        max-width: 210px;
        border: 1px solid #ccc;
        box-shadow: 0 0 3px #ccc;
      }
    }
  }

  .content li img.imgleft {
    float: left;
  }

  .content li img.imgright {
    margin-right: -10px;
    float: right;
  }

  .content li span.spanleft {
    float: left;
    background: #fff;
  }

  .content li span.spanright {
    float: right;
    background: #7cfc00;
  }

}
</style>