<template>
  <div id="todo-list">
    <h2 class="todo-title">记事本</h2>
    <input type="text" placeholder="请输入非空内容" v-model="todo" @keyup.enter="add"><button @click="add">确认</button>
    <ul class="todo-box">
      <li v-for="(item, index) in todoList" :key="index" @dblclick="deleteTodo(index)" class="todo">{{ item }}
        <button class="remove" @click="deleteTodo(index)">X</button>
      </li>
    </ul>
    <p class="tips">双击即可删除</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref } from "vue";
export default defineComponent({
  name: "TodoList",
  setup() {
    const state = reactive({
      // 动态绑定的输入值
      todo: '',
      // 将用户输入添加的数组中
      add(): void {
        if (state.todo === '') {
            alert('输入不能为空!');
        } else {
            // 不为空则添加到数组中
            todoList.value.push(state.todo);
        }

        // 将输入框置空
        state.todo = ''
      },
      // 删除指定数组元素
      deleteTodo(index: number): void {
        // 使用splice进行指定位置的元素删除
        todoList.value.splice(index, 1)
      },
    })
    // 声明的todoList响应式对象
    const todoList = ref<Array<string>>(['吃饭', '睡觉', '打豆豆'])
    return {
      ...toRefs(state),
      todoList
    };
  },
});
</script>

<style scoped lang="scss">
// @media screen and (max-width:445px) {
//   #todo-list {
//     width: 100vw;
//   }
// }

#todo-list {
  width: 460px;
  height: 100%;
  margin: 0 auto;
  // text-align: left;
  font-size: 14px;
  text-align: center;
  position: relative;
  background-color: White;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0px 0px 40px rgba(0, 0, 0, 0.1) inset;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -ms-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0px 0px 40px rgba(0, 0, 0, 0.1) inset;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 10px;
    right: 10px;
    z-index: -1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    -ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    border-radius: 100px/10px;
    -moz-border-radius: 100px/10px;
  }

  .todo-title {
    margin-bottom: 16px;
  }

  .todo-box {
    width: 82%;
    margin: 20px auto;
    color: rgb(118, 117, 117);
    font-size: 18px;

    .todo {
      position: relative;
      height: 26px;
      margin: 6px 0;
      // line-height: 26px;

      border-bottom: 2px solid rgb(160, 160, 160);
      // background-color: orange;
      text-align: left;
      text-indent: 34px;

      .remove {
        position: absolute;
        right: 30px;
        top: 5px;
        width: 20px;
        height: 20px;

        line-height: 10px;
      }
    }
  }

  // 提示用户删除信息
  .tips {
    margin-top: -10px;
    color: #ccc;
    font-size: 16px;
    font-weight: bold
  }
}
</style>
