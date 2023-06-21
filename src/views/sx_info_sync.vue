<template>
    <div id="todo-list">
        <!--  表单提交  -->
        <h2 class="todo-title">事项信息同步</h2>
        <form @submit.prevent="submitForm" role="form">
            <label for="inputSuccess">
                实施编码：
            </label>
            <input  style=" width: 40%; border-radius: 16px; text-indent: 12px; margin-right: 4px;" type="text" v-model="parameter.implementCode"  maxlength="31" placeholder="请输入实施编码"/>
            <button  style=" width: 10%; border-radius: 16px;" type="submit">提交</button>
        </form>

        <!--  返回结果渲染  -->
        <div v-show="isShow">
            <h2  class="todo-title"  style="font-size: 18px; color: #096dd9; margin: 20px auto;">同步状态信息:</h2>
            <ul class="todo-box">
                <li class="todo"><p style="font-size: 12px; color: #096dd9;">事项基本信息：</p>{{sxjbxx}}</li>
                <li class="todo"><p style="font-size: 12px; color: #096dd9;">扩展信息：</p>{{kzxx}}</li>
                <li class="todo"><p style="font-size: 12px; color: #096dd9;">材料信息：</p>{{clxx}}</li>
                <li class="todo"><p style="font-size: 12px; color: #096dd9;">环节信息：</p>{{hjxx}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default  {
    data() {
        return {
            isShow: false, //不显示数据
            listData: [], //渲染的数据
            sxjbxx: [], //渲染的"事项基本信息"
            kzxx: [], //渲染的"扩展信息"
            clxx: [], //渲染的"材料信息"
            hjxx: [], //渲染的"环节信息"
            parameter: { //接口入参
                implementCode: ''
            }
        }
    },
    methods: {
        // 提交表单事件
        submitForm() {
            if (this.parameter.implementCode === '') {
                alert('请输入实施编码!');
            } else {
                let url = "/dd/sx/repair";
                this.$axios.get(
                    '/api' + url, {params: this.parameter}
                ).then(
                    response => {
                        // 将接口返回值赋值给listData进行渲染
                        this.listData = response.data
                        if (this.listData == '基本信息数据为空') {
                            alert('未查询到该事项，请核对实施编码是否正确!');
                        } else {
                            this.listData = response.data
                            this.sxjbxx = this.listData['事项基本信息']
                            this.kzxx = this.listData['扩展信息']
                            this.clxx = this.listData['材料信息']
                            this.hjxx = this.listData['环节信息']
                            this.isShow = true //显示数据
                        }
                        // 日志打印
                        console.log(this.listData);
                        // 打印数据类型
                        console.log(typeof(this.listData));
                    }
                ).catch(
                    error => {
                        console.log(error)
                    }
                )
                // 将输入框置空
                this.parameter.implementCode = ''
            }
        },
    }
}
</script>

<style scoped lang="scss">
// @media screen and (max-width:445px) {
//   #todo-list {
//     width: 100vw;
//   }
// }

#todo-list {
    width: 80%;
    min-height: 100%;
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
        //font-size: 18px;

        .todo {
            position: relative;
            //height: 26px;
            margin: 6px 0;
            // line-height: 26px;
            border-bottom: 2px solid rgb(160, 160, 160);
            // background-color: orange;
            text-align: left;
            //text-indent: 34px;
        }
    }
}
</style>
