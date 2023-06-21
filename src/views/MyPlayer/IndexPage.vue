<template>
  <div id="player">
    <a-carousel class="my-carousel"  effect="fade" autoplay easing="true" >
      <div v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl" class="banner-img" alt="banner图片"/>
      </div>
    </a-carousel>
    <div class="search">
      <!-- 搜索框 双向数据绑定 按下回车 -->
      <input type="text" v-model.trim="search" @keyup.enter="searchMusic" />
      <button @click="searchMusic">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <!-- tab（路由） -->
    <div class="tab-wrapper">
      <!-- tab-nav 真实场景下是不需要这个导航的 -->
<!--      <div class="tab-bar">-->
<!--        <router-link active-class="active" to="/blackmusic/result" class="bar-item">-->
<!--          搜索结果-->
<!--        </router-link>-->
<!--        <router-link active-class="active" to="/blackmusic/player" class="bar-item">-->
<!--          歌曲播放-->
<!--        </router-link>-->
<!--        <router-link active-class="active" to="/blackmusic/video" class="bar-item">-->
<!--          mv-->
<!--        </router-link>-->
<!--        <router-link active-class="active" to="/blackmusic/comment" class="bar-item">-->
<!--          歌曲评论-->
<!--        </router-link>-->
<!--      </div>-->
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <!-- 内容  -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

let search = ref("");
const searchMusic = () => {
  router.push(`/blackmusic/result/${search.value}`);
};

interface Banner {
  imageUrl: string;
}

let bannerList = ref<Array<Banner>>([])

onMounted(async ()=>{
  let res = await axios.get("http://cloud-music.pl-fe.cn/banner");
  console.log(res.data.banners);
  bannerList.value = res.data.banners;
})

</script>

<style scoped lang="scss">
@import url(../../assets/playercss/iconfont.css);

#player {
  width: 980px;
  margin: 0 auto;
}
#player ul {
  padding: 0;
}
#player .title {
  text-align: center;
  color: #dd021a;
  font-size: 30px;
  margin: 20px 0;
}
#player .search {
  width: 420px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  border: 1px solid gray;
  border-radius: 4px;
  overflow: hidden;
}
#player .search input {
  flex: 1;
  border: none;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  padding: 0;
  height: 100%;
  padding-left: 10px;
}
#player .search button {
  width: 60px;
  height: 100%;
  outline: none;
  box-shadow: 0 0 1px gray;
}
#player .search button span {
  font-size: 20px;
}
#player .result {
  padding-left: 60px;
  font-size: 12px;
  color: gray;
}
#player .result span {
  color: #de021c;
}
#player .tab-wrapper {
  width: 900px;
  margin: 30px auto;
}
#player .tab-wrapper .tab-bar {
  padding: 0;
  display: flex;
  line-height: 40px;
  height: 40px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 2px solid #ccc;
}
#player .tab-wrapper .tab-bar .bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  list-style: none;
  cursor: pointer;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
}
#player .tab-wrapper .tab-bar .bar-item a {
  color: black;
}

#player .tab-wrapper .tab-bar .bar-item:first-child {
  margin-left: -1px;
}
#player .tab-wrapper .tab-bar .bar-item:last-child {
  margin-right: -1px;
}
#player .tab-wrapper .tab-bar .bar-item.active {
  box-shadow: 0 -2px #d13030;
  border-left-color: #ccc;
  border-right-color: #ccc;
  background-color: white;
  border-bottom-color: transparent;
}
#player .tab-wrapper .tab-content {
  /* max-height: 500px; */
  overflow-y: auto;
}



.my-carousel {
  //width:800px;
  margin: 20px;
}
.my-carousel img {
  width:100%;
  //height: 100%;
}
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  width: 950px;
  height: 200px;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
.banner-img {
  width: 950px;
}
</style>