<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="(item, index) in commentList" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{ item.user.nickname }}:</span>
            <span class="content">{{ item.content }}</span>
          </div>
          <div class="bottom">
            <div class="time">2016年9月18日</div>
            <div class="like-wrapper">
              <span>👍</span>({{ item.likedCount }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import {ref,defineComponent} from 'vue'
import {useRoute} from "vue-router";
import axios from 'axios'
interface User {
  avatarUrl: string;
  nickname: string;
}

interface Comment {
  user: User;
  content: string;
  likedCount: number;
}
export default defineComponent({
  setup(){
    const route = useRoute();
    const commentList = ref<Comment[]>([])
    let id = route.params.id;
    if(!id) {
      alert('缺少参数');
      return ;
    }
    axios.get(`http://cloud-music.pl-fe.cn/comment/hot?id=${id}&type=0`).then((res)=>{
      // commentList.value =
      const {data:{hotComments}} = res;
      commentList.value = hotComments;
      console.log(res)
    })
    return {
      id,
      commentList
    }
  }
})
</script>

<style scoped lang="scss">
.comment-wrapper {
  width: 900px;
}
.comment-wrapper .items {
  border-bottom: 1px solid #cfcfcf;
}
.comment-wrapper .items .item {
  padding-top: 15px;
  display: flex;
  border-top: 1px solid #cfcfcf;
  padding-bottom: 15px;
}
.comment-wrapper .items .item .left {
  width: 70px;
}
.comment-wrapper .items .item .left img {
  width: 60px;
  margin: 0 auto;
}
.comment-wrapper .items .item .right {
  flex: 1;
}
.comment-wrapper .items .item .right .top {
  font-size: 13px;
}
.comment-wrapper .items .item .right .top .user {
  color:#348acc;
}
.comment-wrapper .items .item .right .top .content {
  color:#333333;
}
.comment-wrapper .items .item .right .bottom {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.comment-wrapper .items .item .right .bottom .time {
  font-size: 13px;
  color:#999999;
}
.comment-wrapper .items .item .right .bottom .like-wrapper {
  color:#333333;
  font-size: 13px;
  cursor: pointer;
}
.comment-wrapper .items .item .right .bottom .like-wrapper span {
  margin-right: 8px;
}

</style>