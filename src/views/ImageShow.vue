<template>
  <div class="ImageShow">
    <div class="img" ref="imgDom"><img :src="imgList[index]" alt="说明文字"></div>
    <div class="change">
      <div class="pre" @click="pre">上一个</div>
      <div class="next" @click="next">下一个</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {Ref, ref} from "vue";

const imgList: Array<string> = [
  require("../assets/images/bg1.jpg"),
  require("../assets/images/bg2.jpg"),
  require("../assets/images/bg3.jpg"),
  require("../assets/images/bg4.jpg"),
  require("../assets/images/bg5.jpg"),
]
// 使用ref声明的对象,获取其中的值时需要.value才可以获取
let index: Ref<number> = ref(0);
const pre: () => void = () => {
  console.log(index);
  index.value--;
  if (index.value < 0) {
    index.value = imgList.length - 1;
  }
};
const next = () => {
  index.value++;
  if (index.value > imgList.length - 1) {
    index.value = 0;
  }
  console.log(index);
};
</script>
<style lang="scss" scoped>
.ImageShow {
  position: relative;
  width: 60vw;
  height: 80vh;
  overflow: hidden;
  margin: auto;

  .change {
    width: 100%;
    position: absolute;
    // top: 0;
    bottom: 70px;
    display: flex;
    justify-content: center;
  }

  .pre,
  .next {
    width: 80px;
    height: 30px;
    line-height: 30px;
    margin: 10px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #FFC75F;

  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
