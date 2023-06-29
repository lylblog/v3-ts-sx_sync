<template>
  <div class="wrap" id="app">
    <div class="search_form">
      <div class="logo"><img src="../assets/images/logo.png" alt="logo" /></div>
      <div class="form_group">
        <input
            type="text"
            class="input_txt"
            placeholder="请输入查询的天气"
            v-model.trim="city"
            @keyup.enter="searchWeather()"
        />
        <button
            class="input_sub"
            :class="{ loading: isLoading }"
            @click="searchWeather()"
        >
          搜 索
        </button>
      </div>
      <div class="hotkey">
        <a
            href="javascript:;"
            @click="
            city = '北京';
            searchWeather();
          "
        >北京</a
        >
        <a
            href="javascript:;"
            @click="
            city = '上海';
            searchWeather();
          "
        >上海</a
        >
        <a
            href="javascript:;"
            @click="
            city = '广州';
            searchWeather();
          "
        >广州</a
        >
        <a
            href="javascript:;"
            @click="
            city = '深圳';
            searchWeather();
          "
        >深圳</a
        >
      </div>
    </div>
    <!-- <ul class="weather_list"> -->
    <transition-group
        name="list"
        tag="ul"
        class="weather_list"
        v-on:after-enter="afterEnter"
    >
      <li
          v-for="(item, index) in weatherList"
          :key="index"
          :style="{ transitionDelay: index * 200 + 'ms' }"
      >
        <div class="info_type">
          <!-- 雨 -->
          <span v-if="item.type.indexOf('雨') != -1" class="iconfont"
          >&#xe931;</span
          >
          <!-- 晴 -->
          <span v-else-if="item.type.indexOf('晴') != -1" class="iconfont"
          >&#xe933;</span
          >
          <!-- 阴 -->
          <span v-else-if="item.type.indexOf('阴') != -1" class="iconfont"
          >&#xe92d;</span
          >
          <!-- 雪 -->
          <span v-else-if="item.type.indexOf('雪') != -1" class="iconfont"
          >&#xeb87;</span
          >
          <!-- 云 -->
          <span v-else-if="item.type.indexOf('云') != -1" class="iconfont"
          >&#xeb79;</span
          >
          <!-- 雷 -->
          <span v-else-if="item.type.indexOf('雷') != -1" class="iconfont"
          >&#xeb77;</span
          >
          <!-- 雹 -->
          <span v-else-if="item.type.indexOf('雹') != -1" class="iconfont"
          >&#xeb76;</span
          >
          <!-- 雾 -->
          <span v-else class="iconfont">&#xeb75;</span>
        </div>
        <div class="info_temp">
          高 <b>{{ highTem(item) }}</b
        ><br />{{ item.low }}
        </div>
        <div class="info_date">
          <b>{{ item.date }}</b
          ><span>{{ item.type }}</span>
        </div>
      </li>
    </transition-group>
    <!-- </ul> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import axios from "axios";

interface Weather {
  date: string;
  high: string;
  low: string;
  type: string;
}

let city = ref("深圳");
let weatherList = ref<Array<Weather>>([]);
let isLoading = ref<boolean>(false);

const searchWeather = async () => {
  // 开始加载
  isLoading.value = true;
  // 清空
  weatherList.value = [];
  let res = await axios.get(
      `http://wthrcdn.etouch.cn/weather_mini?city=${city.value}`
  );
  console.log(res.data.data.forecast);
  // 还原
  setTimeout(() => {
    isLoading.value = false;
    // 获取天气
    weatherList.value = res.data.data.forecast;
  }, 1500);
};

const afterEnter = (e) => {
  e.style = "";
};

const highTem = (item: Weather) => {
  return item.high.split(" ")[1];
};
</script>

<style scoped lang="scss">
@import url("../assets/css/reset.css");
@import url("../assets/css/iconfont.css");
@import url("../assets/css/main.css");
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
