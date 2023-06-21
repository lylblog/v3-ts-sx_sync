<template>
  <div id="searchWeather">
    <h2 class="title"><span class="city-name">{{ cityCop }}</span>天气查查查</h2>
    <input type="text" placeholder="请输入查询的城市" v-model.trim="city" @keyup.enter="searchWeather"
      class="search-name"><button @click="searchWeather" class="search-btn">点击查询</button>
<!--    <div>-->
<!--        <ul>-->
<!--            <div v-for="(weather, index) in weatherList" :key="index">-->
<!--                <li v-for="(weathercasts, index) in weather.casts" :key="index">-->
<!--                    weather: {{weathercasts}}-->
<!--                </li>-->
<!--            </div>-->
<!--        </ul>-->
<!--    </div>-->
    <div class="wea-content">
      <ul class="search-ul">
        <div v-for="(weather, index) in weatherList" :key="index" class="each-day">
              <li v-for="(weathercasts, index) in weather.casts" :key="index">
            <span class="wea-date">{{ weathercasts }}</span>
<!--            <span class="wea-date">{{ item.date }}</span>&nbsp;<span class="wea-high">{{ item.high }}</span>-->
<!--            <span class="wea-low">{{ item.low }}</span>-->
<!--            <span v-if="item.type.indexOf('云') != -1">🌥️</span>-->
<!--            <span v-else-if="item.type.indexOf('雨') != -1">🌧️</span>-->
<!--            <span v-else-if="item.type.indexOf('雷') != -1">🌩</span>-->
<!--            <span v-else>🌞</span>-->
              </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"
// 定义接口类型
// 包含 : 日期、高温、低温、天气
interface Weather {
  date: string;
  high: string;
  low: string;
  type: string;
}
let city = ref("");
let cityCop = ref("");
let weatherList = ref<Array<Weather>>([]);
const searchWeather = async () => {
  // 请求的天气数据
  let resData = await axios.get(
    // `http://wthrcdn.etouch.cn/weather_mini?city=${city.value}`
    //   `https://restapi.amap.com/v3/weather/weatherInfo?key=cf43592fa468d488f0653b80b08e4942&output=JSON&city=${city.value}`
      `https://restapi.amap.com/v3/weather/weatherInfo?key=cf43592fa468d488f0653b80b08e4942&extensions=all&output=JSON&city=${city.value}`
  );
  cityCop.value = city.value
  city.value = ''

  weatherList.value = resData.data.forecasts;
  console.log(resData.data.forecasts);
  console.log(weatherList.value)
  // weatherList = resData.data.lives;

}
</script>
<style lang="scss" scoped>
#searchWeather {
  .title {
    margin: 20px auto;
  }

  .search-name {

    width: 220px;
    height: 28px;
    margin-right: 4px;
    text-indent: 12px;
    // outline: 0;
    font-size: 18px;
    border-radius: 16px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 233, 152, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 233, 161, 0.6)
  }

  .search-name:focus {
    border-color: #66afe9;
    outline: 0;
    border-radius: 16px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 233, 152, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 233, 161, 0.6)
  }

  .search-btn {
    width: 60px;
    height: 30px;
  }

  .city-name {
    font-size: 20px;
    color: rgb(226, 40, 40);
    text-align: left;
    margin-bottom: 10px;
    margin-right: 4px;
  }

  .wea-content {
    width: 100%;
    margin: 0 auto;
    background-color: transparent;

    .search-ul {
      width: 300px;
      margin: 30px auto;
      background-color: transparent;
      opacity: 0.8;

      .each-day {
        height: 26px;
        border-bottom: 1px solid rgb(14, 13, 13);
        margin: 10px 0;
        text-indent: 20px;
        text-align: left;
      }
    }
  }
}
</style>