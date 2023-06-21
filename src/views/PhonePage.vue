<template>
  <div id="phone-manage">
    <div class="phone-title">
        <a href="javascript:" class="title">手机品牌管理</a>
        <input type="text" placeholder="请输入手机品牌" v-model="searchName"/>
    </div>
    <div class="phone-list">
      <div class="list-title-box"><span class="list-title-name">品牌列表</span>
        <button @click="addPhone" class="list-title-btn">添加品牌</button>
      </div>
      <table class="list-content">
        <tr>
          <th>序号</th>
          <th>品牌名称</th>
          <th>创立时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in newList" :key="'phone'+index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.phoneType }}</td>
          <td>{{ timeFormat(item.createTime) }}</td>
          <td>
            <button @click="deletePhone(index)" class="deleteItem-btn">删除</button>
          </td>
        </tr>
      </table>
      <p v-show="newList.length === 0" class="noInfo">未查找到符合条件的品牌！</p>
    </div>
    <div v-bind:style="{ display:addPage}" class="addBrand">
      <h3>添加品牌 <span @click="cancel">X</span></h3>
      <input type="text" v-model="addName" placeholder="请输入品牌名称" @keyup.enter="certain"><br>
      <div class="add-footer">
        <button @click="cancel" class="cancel">取消</button>
        <button @click="certain" class="certain">确认</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
interface PhoneInfo {
  phoneType: string;
  createTime: number;
}
import {ref, computed} from "vue";
//搜索框的绑定
let searchName = ref<string>("");
//添加手机品牌的输入框
let addName = ref<string>("");
//添加页面的展示与否,可以使用v-show的的boolean值来控制,也可以通过display来设置
let addPage = ref<string>('none');
//手机品牌列表
let phoneList = ref<Array<PhoneInfo>>([{
  phoneType: "小米",
  createTime: Date.now(),
}, {
  phoneType: "华为",
  createTime: Date.now(),
}, {
  phoneType: "中兴",
  createTime: Date.now(),
}, {
  phoneType: "oppo",
  createTime: Date.now(),
},{
  phoneType: "荣耀",
  createTime: Date.now(),
},{
  phoneType: "红米",
  createTime: Date.now(),
},{
  phoneType: "IPhone",
  createTime: Date.now(),
}]);
let newList = computed(() => {
  let tmpList: PhoneInfo [] = [];
  //对原来数组进行遍历,选取符合条件的数据
  phoneList.value.forEach(function (item) {
    if (item.phoneType.indexOf(searchName.value) > -1) {
      tmpList.push(item)
    }
  })
  return tmpList
})
//删除事件
const deletePhone = function (index: number): void {
  //删除之前先进行确认
  if (confirm('您确认删除吗?')) {
    //将指定位置的元素删除
    phoneList.value.splice(index, 1);
  }

};
//添加手机品牌信息对应的方法
const addPhone = function (): void {
  addPage.value = 'block';
};
//添加手机品牌信息的确认按钮
const certain = function (): void {
  if (addName.value === "") {
    alert('请输入手机品牌');
    return
  }
  phoneList.value.push({
    phoneType: addName.value,
    createTime: Date.now()
  })
//    点击确认之后让添加页面隐藏
  addPage.value = 'none';
  addName.value = "";
}
//添加手机品牌信息的取消按钮
const cancel = function (): void {
  addPage.value = 'none';
}
//vue3中没有过滤器,所以声明一个时间戳转换的方法
const timeFormat = (time: number): string => {
  const dat = new Date(time)
  const year = dat.getFullYear();
  const mon = dat.getMonth() + 1 < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1;
  const data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
  const hour = dat.getHours() < 10 ? "0" + dat.getHours() : dat.getHours();
  const min = dat.getMinutes() < 10 ? "0" + dat.getMinutes() : dat.getMinutes();

  return year + "-" + mon + "-" + data + " " + hour + ":" + min;
}
</script>

<style scoped lang="scss">
#phone-manage {
  //  页面头部
  .phone-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    border-radius: 10px 10px 0 0;
    line-height: 80px;
    background-color: #000;
    color: #fff;

    .title {
      font-size: 26px;
      margin-left: 40px;
    }

    input {
      width: 300px;
      height: 40px;
      font-size: 16px;
      text-indent: 14px;
      margin: 20px 60px;
      color: rgba(0, 0, 0, 0.85);

      &:focus {
        outline: none;
      }
    }

  }

  //列表渲染主体部分
  .phone-list {
    .list-title-box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin-top: 20px;
      background: linear-gradient(#19a4ce, #3366cc);

      .list-title-name {
        color: #fff;
        font-size: 20px;
        margin-left: 60px;
      }

      .list-title-btn {
        width: 120px;
        height: 40px;
        background-color: #f3cd57;
        margin: 5px 100px 5px;
        border: 0;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      }
    }

    table.list-content {
      width: 100%;
      border-collapse: collapse;

      th, td {
        height: 40px;
        border: 1px solid #ccc;
        font-size: 18px;
      }

      th {
        font-size: 20px;
        font-weight: bold;
      }

      .deleteItem-btn {

        border: 0;
        font-size: 18px;
        color: #f90;
        background-color: transparent;
      }
    }
    .noInfo {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      border:1px solid #ccc;
    }
  }

  //  添加弹窗界面
  .addBrand {
    position: absolute;
    width: 500px;
    height: 200px;
    background-color: #fff;
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
      span{
        float: right;
        margin-right: 20px;
        color:#000;
        cursor:pointer;
      }
    }
    input {
      width:360px;
      margin:40px auto;
      height: 40px;
      border:1px solid #ccc;
      font-size: 18px;
      text-indent: 1em;
      &:focus {
        border:1px solid #41dfff;
        outline: none;
      }
    }
    .add-footer {
      .certain,.cancel {
        float: right;
        width:80px;
        height:40px;
        color:#0e1921;
        margin-right: 20px;
        margin-top:-10px;
        border:1px solid #ccc;
        border-radius: 6px;
        font-size: 18px;
      }
      .certain {
        color:#fff;
        background-color: #19a4ce;
      }
    }
  }
}
</style>