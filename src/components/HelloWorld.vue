<template>
  <div class="alert-box" v-if="isShow">
    <h3 :class="infos.type == 0 ? 'err':''" >{{ infos.title }}</h3>
    <div class="content">
      <p> {{ infos.content }}</p>
    </div>
    <div class="add-footer">
      <button @click="buttonEvent(1)" class="certain">确认</button>
      <button @click="buttonEvent(0)" class="cancel">取消</button>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent,onMounted,ref} from "vue";

export default defineComponent({
  name: "TestChild",
  props: ['infos'],
  emits: {
    initEvent: null
  },
  setup(props) {
    //getCurrentInstance只在开发阶段有用
    // const { ctx } = getCurrentInstance();
    // console.log(ctx.infos)
    let isShow  = ref(true)
    onMounted(()=>{
      let timer = setTimeout(()=>{
        isShow.value = false;
        clearTimeout(timer)
      },props.infos.seconds)
    });

    const buttonEvent: (result: number) => void = (result) => {
      console.log(result)
      console.log('点击了button按钮')
    }
    return {
      // info,
      isShow,
      buttonEvent
    };
  },
});
</script>
<style lang="scss" scoped>
.alert-box {
  position: absolute;
  width: 500px;
  height: 182px;
  //background-color: #fff;
  border:1px solid #cccccc;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h3 {
    height: 40px;
    line-height: 40px;
    background-color: #23acce;
    text-align: left;
    color:#fff;
    text-indent: 2em;
    &.err {
      background:#c46f64;
    }
    span{
      float: right;
      margin-right: 20px;
      color:#000;
      cursor:pointer;
    }
  }
  .content {
    width:360px;
    height:20px ;
    line-height: 20px;
    margin:40px auto;
    //height: 40px;
    font-size: 28px;
    text-indent: 1em;
  }
  .add-footer {
    width: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: right;
    .certain, .cancel {
      width: 80px;
      height: 40px;
      color: #0e1921;
      margin-right: 20px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 18px;
    }

    .certain {
      color: #fff;
      background-color: #19a4ce;
    }
  }
}
</style>