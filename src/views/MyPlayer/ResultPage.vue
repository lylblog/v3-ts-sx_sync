<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in musicList" :key="index">
      <div class="name">
        <span class="iconfont icon-play" @click="toPlay(item.id)"></span>
        <a href="javascript:void(0)" @click="toComment(item.id)">{{
            item.name
          }}</a>
        <span class="iconfont icon-editmedia mv-play" v-if="item.mvid != 0" @click="toMv(item.mvid)"></span>
      </div>
      <div class="singer">{{ formatSinger(item.artists) }}</div>
      <div class="album">《{{ item.album.name }}》</div>
      <!-- 持续时间 -->
      <div class="time">{{ formatTime(item.duration) }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from 'axios'

interface Sing {
  name: string;
}

interface Album {
  id: number;
  name: string;
}

interface Music {
  id: number;
  name: string;
  mvid: number;
  artists: Sing[];
  album: Album;
  duration: number;
}

//路由
const router = useRouter();
const route = useRoute();
let musicList = ref<Array<Music>>([]);

// watch(router.currentRoute, async newValue => {
//   console.log("路由发生了改变，新值为：" + newValue.params.search);
//   if(!newValue.params.search) return ;
//   let res = await axios.get(
//       `http://localhost:3000/search?keywords=${newValue.params.search}`
//   );
//   // console.log(res.data.result.songs);
//   musicList.value = res.data.result.songs;
// }, { immediate: true });
//vue3中使用watch进行监听时,第一参数必须为响应式对象
watch(() => route.params.search, async (value1, value2) => {
  // console.log('newValue is ',value1);
  // console.log('oldValue is ',value2)
  console.log('旧的值为',value2)
  let {data: {result: {songs}}} = await axios.get(`http://cloud-music.pl-fe.cn/search?keywords=${value1}`)
  if (!songs) {
    alert('未查找到歌曲');
    return;
  }
  musicList.value = songs;
}, {immediate: true});


onMounted(async () => {
  //vue3中获取路由参数可以使用router对象，router.currentRoute.value.params.search或者使用route，route.params.search
  let search = route.params.search;
  // if(!search) {
  //   alert('非法访问')
  //   return;
  // }
  try {
    let {data: {result: {songs}}} = await axios.get(`http://cloud-music.pl-fe.cn/search?keywords=${search}`);
    if (!songs) {




      alert('没有找到您的歌曲');
      return
    }
    musicList.value = songs;
    // console.log(res)
  } catch (e) {
    console.log(e)
  }

  // console.log(songs)
  console.log('route', route.params.search)
})
//点击mv，跳转到mv页面，将歌曲id传递过去
const toMv: (mvid: number) => void = (mvid) => {
  router.push(`/blackmusic/video/${mvid}`)
  console.log(mvid)
}
//点击评论，跳转到评论页面，将id传过去
const toComment: (id: number) => void = (id) => {
  router.push(`/blackmusic/comment/${id}`)
  console.log(id)
}
//点击播放，跳转到播放页面，并将id传递过去
const toPlay: (id: number) => void = (id) => {
  router.push(`/blackmusic/player/${id}`)
  console.log(id);
}
//歌手信息格式化
const formatSinger = (singers: Sing[]): string => {
  // console.log(singers)
  // 空字符串拼接
  let temStr = "";
  // 获取所有的歌手
  for (let i = 0; i < singers.length; i++) {
    // 拼接歌手
    temStr += singers[i].name;
    // 拼接分隔符
    temStr += "/";
  }
  // -1 到倒数第二个 （-1 ,从后往前来算）
  temStr = temStr.slice(0, -1);
  // 返回拼接的数据
  return temStr;
};
// 处理时间
const formatTime = (time: number): string => {
  //console.log(time);
  // 毫秒->秒
  const totalSec = time / 1000;
  // 秒->分 小数部分舍去
  const min = Math.floor(totalSec / 60);
  // 剩余的部分是 秒 不满足分的部分 全部到秒
  let sec = Math.floor(totalSec % 60);
  // 秒不够2位 补足2位
  let strsec = sec < 10 ? "0" + sec : sec;
  return min + ":" + strsec;
};
</script>
<style scoped lang="scss">
.result-wrapper {
  width: 900px;
  text-align: left;
  overflow-y: hidden;
}

.result-wrapper .song {
  display: flex;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  color: gray;
  border: 1px solid transparent;
}

.result-wrapper .song:nth-child(2n) {
  background-color: #f7f7f7;
}

.result-wrapper .song:hover {
  background-color: #f2f2f2;
  border-color: #e1e1e1;
}

.result-wrapper .song .name {
  width: 350px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}

.result-wrapper .song .name span {
  cursor: pointer;
}

.result-wrapper .song .name a {
  cursor: pointer;
  margin: 0 10px;
}

.result-wrapper .song .singer {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.result-wrapper .song .album {
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.result-wrapper .song .time {
  flex: 1;
}

.result-wrapper .song .icon-editmedia {
  color: #b50b0c;
  padding: 5px;

}

.mv-play {
  font-size: 28px;
}
</style>