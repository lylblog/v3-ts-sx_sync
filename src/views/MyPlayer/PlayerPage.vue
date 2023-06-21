<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="@/assets/images/disc.png" alt="" />
      <img class="cover" :src="coverUrl" alt="" />
    </div>
    <div class="right">
      <div class="title">
        <img src="@/assets/images/tag.png" alt="" /><span>{{ songName }}</span>
      </div>
      <div class="singer">
        歌手: <span>{{ singerName }}</span>
      </div>
      <div class="album">
        所属专辑: <span>{{ albumName }}</span>
      </div>
      <audio class="audio" controls autoplay :src="musicUrl"></audio>
      <ul class="lyric-container">
        <li class="lyric" v-for="(item, index) in lyric" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import axios from "axios";
import { useRouter } from "vue-router";

let musicUrl = ref("");
let singerName = ref("");
let coverUrl = ref("");
let albumName = ref("");
let songName = ref("");
let lyric = ref<Array<string>>([]);
const router = useRouter();
axios.get(
    `http://localhost:3000/song/url?id=${router.currentRoute.value.params.id}`
).then(res => {
  musicUrl.value = res.data.data[0].url;
})


axios.get(
    `http://localhost:3000/song/detail?ids=${router.currentRoute.value.params.id}`
).then(res => {
  // 封面地址
  coverUrl.value = res.data.songs[0].al.picUrl;
  // 专辑名
  albumName.value = res.data.songs[0].al.name;
  // 歌手名
  singerName.value = res.data.songs[0].ar[0].name;
  // 歌名
  songName.value = res.data.songs[0].name;
})

onBeforeMount(async () => {
  let res = await axios.get(`http://localhost:3000/lyric?id=${router.currentRoute.value.params.id}`);
  console.log(res);

  lyric.value = res.data.lrc.lyric.split('\n');
  // 循环数组 切掉 [00:00.000]
  for (let i = 0; i < lyric.value.length; i++) {
    lyric.value[i] = lyric.value[i].slice(11);
  }
})

</script>

<style scoped lang="scss">
.player {
  width: 900px;
  display: flex;
}
.player h3,ul {
  margin: 0;
  list-style: none;
  padding: 0;
}
.player .left {
  width: 300px;
  justify-content: center;
  position: relative;
}
.player .left img.disc {
  margin-top: 40px;
}
.player .left img.cover {
  position: absolute;
  top: 97px;
  width: 140px;
  left: 58px;
  border-radius: 50%;
}
.player .right {
  flex: 1;
}
.player .right .title {
  margin-top: 40px;
  display: flex;
  align-content: center;
  height: 40px;
}
.player .right .title img {
  margin-right: 10px;
  height: 25px;
  margin-top: 6px;
}
.player .right .title span {
  font-size: 25px;
}
.player .right .singer,
.player .right .album {
  color:#999999;
  font-size: 13px;
  margin-top: 15px;
}
.player .right .singer span,
.player .right .album span {
  font-size: 14px;
  color:#0c73c2;
}

.player .right .audio {
  width: 100%;
  margin-top:15px;
}
.player .right .lyric-container .lyric {
  font-size: 16px;
  margin-top: 10px;
  margin-left: 30px;
  text-align: left;
}
</style>