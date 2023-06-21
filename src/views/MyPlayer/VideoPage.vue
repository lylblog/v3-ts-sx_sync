<template>
  <div class="video">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{ mvName }}</span>
      <span class="artist">{{ mvArtist }}</span>
    </div>
    <video :src="mvUrl" autoplay controls></video>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from 'axios'

const route = useRoute();
//mv的名字
let mvName = ref("");
//mv地址
let mvUrl = ref("");
//专辑
let mvArtist = ref("");
onMounted(() => {
  const mvid = route.params.mvid;
  // console.log('mvid',mvid);
  axios.get(`http://localhost:3000/mv/url?id=${mvid}`).then(res => {
    mvUrl.value = res.data.data.url;
  })

})
</script>
<style scoped lang="scss">
.video{
  width: 900px;
}
.video .title-wrapper{
  margin-bottom: 10px;
}
.video .title-wrapper .tag{
  padding:0 5px;
  color:#e77077;
  border: 1px solid #e77077;
}
.video .title-wrapper .title{
  font-size: 28px;
  margin-right: 10px;
}
.video .title-wrapper .artist{
  color:#0c73c2;
  font-size: 13px;
}
.video video{
  width: 650px;
}
</style>
