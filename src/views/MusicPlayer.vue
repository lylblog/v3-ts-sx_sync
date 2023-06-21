<template>
  <div class="music-box">
    <div class="head">
      <div class="logo"><img src="../assets/images/player_title.png" alt="图标"></div>
      <div class="search"><input type="text" placeholder="请输入你想要搜索的歌曲" v-model.trim="searchName"
                                 @keyup.enter="searchMusic"><img src="../assets/images/zoom.png" alt=""></div>
    </div>
    <div class="main">
      <div class="music-list">
        <transition-group tag="ul" name="listA" class="song-list">
          <li v-for="(item,index) in musicList" :key="'music'+index" @dblclick="playMusic(item)" class="music-item"
              :style="{transitionDelay:index*10+'ms'}">{{item.name}} - {{ item.artists ? item.artists[0].name : item.content }}
          </li>
        </transition-group>
      </div>
      <div class="music-status">
        <img src="../assets/images/player_bar.png" class="play-img" :class="isPlay?'isPlay':''" alt="指向">
        <div class="album-box">
          <img src="../assets/images/disc.png" class="play-circle autoPlay" :class="isPlay?'playing':''" alt="转盘">
          <img :src="picUrl ? picUrl : require('../assets/images/covers.png')" alt="专辑封面"
               class="default-img autoPlay" :class="isPlay?'playing':''"></div>
      </div>
      <div class="comments-list">
        <div class="comments-box">
          <dl v-for="(item, index) in commentsList" :key="'comment'+index">
            <dt><img :src="item.user.avatarUrl" alt=""/></dt>
            <dd class="name">{{ item.user.nickname }}</dd>
            <dd class="detail">{{ item.content }}</dd>
          </dl>

        </div>

      </div>
    </div>
    <div class="footer">
      <audio :src="musicUrl" controls autoplay  @pause="musicPause" ref="myaudio"
             @play="musicPlay"></audio>
    </div>
  </div>

</template>
<!--script中包含setup是setup的语法糖,当前script中的变量不用在setup中包裹，也不用返回，直接组件provide等-->
<script setup lang="ts">
import {onBeforeMount} from "vue";

// 规范数据类型

interface Artists {
  name: string;
}

interface Album {
  id: number
}

interface Music {
  id: number;
  name: string;
  artists: Artists[];
  mvid: number;
  album: Album
}

interface User {
  avatarUrl: string;
  nickname: string;
}

interface HotComment {
  user: User;
  content: string;
}

// interface BScroll {
//   refresh(): void;
// }

import {ref} from "vue";
import axios from 'axios'

let searchName = ref<string>("")  //搜索的歌曲名字
let musicList = ref<Array<Music>>([])   //歌曲列表数组
let commentsList = ref<Array<HotComment>>([])    //评论列表
let picUrl = ref<string>("") //专辑的封面图片
let musicUrl = ref("") //播放的歌曲地址
let isPlay = ref<boolean>(false)  //是否播放
let myaudio = ref<HTMLElement | null>(null);

onBeforeMount(()=>{
  axios.get('http://cloud-music.pl-fe.cn/search?keywords=断桥残雪').then((res)=>{
    const {data: {result: {songs}}} = res;
    musicList.value = songs;
  })
})
//搜索方法
const searchMusic: () => void = async () => {
  if (searchName.value === "") {
    alert("请输入歌曲名字");
    return;
  }
  try {
    let res = await axios.get(`http://cloud-music.pl-fe.cn/search?keywords=${searchName.value}`)
    // console.log(res)
    if (res.status === 200) {
      const {data: {result: {songs}}} = res;
      musicList.value = songs;
      //搜索完成之后将搜索框置空
      searchName.value = ""
    }
  } catch (e) {
    alert('没有找到歌曲')
    console.log(e)
  }
}
//双击列表播放音乐 以及专辑封面 同时加载评论列表
const playMusic: (item: Music) => void = async (item) => {

  // console.log(id)
  //获取该音乐的播放地址
  musicUrl.value = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
  isPlay.value = true;
//  获取该专辑的封面
  axios.get(`http://cloud-music.pl-fe.cn/album?id=${item.album.id}`).then(({data: {album: {picUrl: statusPic}}}) => {
    console.log('封面', statusPic);
    //将其解构赋值当作参数传递
    picUrl.value = statusPic;
    // console.log(picUrl)
  })
//  同时获取该歌曲的评论
  axios.get(`http://cloud-music.pl-fe.cn/comment/hot?id=${item.id}&type=0`).then(res => {
    const {data: {hotComments}} = res;
    // console.log('热门评论', hotComments)
    commentsList.value = hotComments;
  }).catch(e => {
    console.log(e)
  })
}
//音乐播放和暂停事件
const musicPlay: () => void = () => {
  console.log('点击了播放')
  console.log(myaudio.value)
  myaudio.value.play();
  isPlay.value = true;

}
//点击音乐暂停
const musicPause: () => void = () => {
  console.log('点击了暂停')

  isPlay.value = false;
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  background: #000000;
  width: 0;
  height: 0;
}

.music-box {
  width: 100%;
  height: 100%;
  border: 1px solid #cccccc;
  background: url("../assets/images/bg.jpg") center center no-repeat ;
  background-size:cover;
  overflow: hidden;


  .head {
    display: flex;
    justify-content: space-between;
    height: 10%;
    background-color: #1eacda;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 200px;
      text-align: center;
      transform: scale(1.6);

      img {

      }
    }

    .search {
      position: relative;
      width: 400px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        position: absolute;
        right: 70px;
        cursor: pointer;
        transform: scale(1.2)
      }

      input {
        margin-right: 23px;
        width: 320px;
        height: 44px;
        border-radius: 22px;
        border: 0;
        background: 265px center no-repeat rgba(255, 255, 255, 0.7);
        text-indent: 18px;
        font-size: 18px;
        outline: none;
      }
    }
  }


  .main {
    display: flex;
    height: 80%;

    .music-list {
      width: calc(100% / 3);
      height: 100%;
      overflow: auto;
      padding-right: 2px;
      background: url('@/assets/images/line.png') right center no-repeat;

      .song-list {
        width: 80%;
        height: 80%;
    margin-top:10px;
        .listA-enter-active,
        .listA-leave-active {
          transition: all 2s;
        }

        .listA-enter,
        .listA-leave-to {
          opacity: 0;
          transform: translateX(30px);
        }
        .music-item {
          width: 100%;
          height: 40px;
          font-size: 18px;
          color: #333;
          line-height: 36px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          cursor: pointer;
          text-indent: 4em;
        }
      }





    }

    .music-status {
      position: relative;
      width: calc(100% / 3);
      height: 100%;

      .play-img {
        position: absolute;
        left: calc(50% + 10px);
        transform: rotate(-30deg);
        transform-origin: 10px 10px;
        transition: 1s;
        z-index: 2;

        &.isPlay {
          transform: rotate(10deg);
        }
      }

      .album-box {
        position: relative;
        width: 100%;
        //background-color: green;
        overflow: hidden;

        .play-circle {
          width: 80%;
          margin: 80px auto;
        }

        .autoPlay {
          //animation: Rotate infinite linear 5s;
          animation-name: Rotate;
          animation-iteration-count: infinite;
          animation-play-state: paused;
          animation-timing-function: linear;
          animation-duration: 5s;
        }

        @keyframes Rotate {
          from {
            transform: rotateZ(0);
          }

          to {
            transform: rotateZ(360deg);
          }
        }

        .playing {
          animation-play-state: running;
        }

        .default-img {
          position: absolute;
          top: 32%;
          left: 28%;
          width: 45%;
          border-radius: 83px;
        }
      }


    }

    .comments-list {
      width: 33%;
      height: 100%;
      //box-sizing: border-box;
      overflow: scroll;
      background: url("../assets/images/line.png") left center no-repeat;
      .comments-box {
        width:90%;
        height: 100%;
        padding-left:20px;
        box-sizing: border-box;
        dl {
          width: 100%;
          text-align: left;
          margin-bottom: 20px;
          margin-top: 10px;
          dt {
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .name {
            color:#2b5ee0;
            margin-left: 56px;
            margin-top: -50px;
            font-weight: bold;
            font-size: 18px;
          }
          .detail {
            width: 80%;
            margin-left: 56px;
            font-size: 16px;
          }
        }
      }

    }
  }

  .footer {

    height: 10%;
    //background-color: #c777b9;

    audio {
      width: 100%;
      height: 100%;
      outline: none;
      background-color: #f1f3f4;
      font-size: 20px;
    }
  }
}
</style>