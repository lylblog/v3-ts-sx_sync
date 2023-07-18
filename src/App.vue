<template>
<!--    <Layout></Layout>-->
  <div class="container">
<!--    <nav v-if="$route.meta.isShow">   &lt;!&ndash;    配合路由文件中meta: { isShow: false/true},判断哪些页面显示导航栏&ndash;&gt;-->
<!--      &lt;!&ndash; 路由导航&ndash;&gt;-->
<!--      &lt;!&ndash;  <router-link to="/login">登录</router-link> &ndash;&gt;-->
<!--      <router-link to="/login_new">登录</router-link>-->
<!--      <router-link to="/sx_info_sync">事项同步</router-link>-->
<!--      <router-link to="/count">计数器</router-link>-->
<!--      <router-link to="/imageshow">图片切换</router-link>-->
<!--      <router-link to="/todo">小黑记事本</router-link>-->
<!--      <router-link to="/weather">天气查查查</router-link>-->
<!--      <router-link to="/chat">知心姐姐</router-link>-->
<!--      <router-link to="/phone">手机品牌管理</router-link>-->
<!--      <router-link to="/weathernew">天知道</router-link>-->
<!--      <router-link to="/musicplayer">悦听播放器</router-link>-->
<!--      <router-link to="/blackmusic">云听播放器</router-link>-->
<!--    </nav>-->
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <!-- <router-view />-->
        <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// import Layout from "@/layout/layout.vue";
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-weight: normal;
  height: 100vh;
  width: 100%;
  padding: 0;
}

* {
  margin: 0;
  padding: 0;
  //font-family: "微软雅黑";
}

li {
  list-style: none;
}

a {

  color: #fff;
  text-decoration: none;
}

img {
  display: block;
}

nav {
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin-right: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }

    &:hover {
      background-color: #7bf0a0;
    }
  }
}

.container {
  width: 100%;
  //width: 60vw;
  height: 100vh;

  // background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  margin: 0 auto;
  border: 1px solid #fff;
  // overflow: hidden;
}
</style>

