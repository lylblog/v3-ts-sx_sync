zz<template>
  <div class="count">
    <button class="reduce" :disabled="num <= min" :class="num <= min ? 'disab' : ''" @click="reduce">—</button>
    <span class="num">{{ num }}</span>
    <button class="add" :disabled="num >= max" :class="num >= max ? 'disab' : ''" @click="add">+</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
// 定义接口数据类型,interface是一个对象类型
interface Count {
  num: number;
  min: number;
  max: number;
}
export default defineComponent({
  name: 'MyCount',
  setup() {
    const state: Count = reactive({
      // 计数器中的num值
      num: 0,
      min: -5,
      max: 5,
    });
    // 按下减的方法
    const reduce = (): void => {
      if (state.num > state.min)
        state.num--;
    };
    // add方法，增加数字的内容
    const add = (): void => {
      if (state.num < state.max) {
        state.num++;
      }
    };
    return {
      ...toRefs(state),
      reduce,
      add,
    };
  }
})
</script>
<style scoped lang="scss">
.count {
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: rgba(172, 200, 220, 0.945);
  display: flex;
  margin: 20% auto;
  border-radius: 8px;
  justify-content: space-between;

  .reduce,
  .add {
    width: 50px;
    height: 50px;
    background-color: rgb(151, 195, 187);
    border: 0;

    &:hover {
      color: rgb(241, 50, 50);
      // background-color: rgb(33, 117, 219);
    }
  }

  .disab {
    cursor: not-allowed;
    background-color: #aca5a5bf;

    &:hover {
      color: rgba(16, 16, 16, 0.3);
      background-color: #aca5a5bf;
    }
  }

  .reduce {
    border-radius: 8px 0 0 8px;
  }

  .add {
    border-radius: 0 8px 8px 0;
  }

}
</style>
