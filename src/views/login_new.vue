<template>
    <div id="building" class="loginContainer">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="formStyle">
            <el-form-item label="账号" prop="username" class="label" >
                <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password" class="label">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" @click="$event => Login()">登录</el-button>
                <el-button  @click="$event => resetForm()">重置</el-button>
            </el-form-item>
            <div class="unlogin">
                <router-link :to="{ path: '/forgetpwd' }"> 忘记密码? </router-link>
                |
                <router-link :to="{ path: '/register' }">
                    <a href="register.vue" target="_blank" align="right">注册新账号</a>
                </router-link>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive} from "vue";
import router from "@/router";
// import { adminLoginApi } from "../../utils/request/api";
// import Cookie from "js-cookie";
import axios from "axios";




export default defineComponent ({
    name: 'HelloWorld',
    setup() {
        // 表单数据
        let ruleForm = reactive({
            username: "",
            password: "",
        });
        // 获取el-form组件对象， 名称和表单绑定的ref一样，他们会自动关联。
        let ruleFormRef = ref();

        // 校验密码的函数  传3个参数，并对参数利用ts进行类型约束
        // 进行类型约束  rule的类型不确定，就用unknown; 密码放在输入框，类型为string
        // 函数， 里面有一个string类型的参数，是可选的。
        const validatePassword = (
            rule: unknown,
            value: string | undefined,
            callback: (msg?: string) => void
        ) => {
            // 判断vaLue是否为空，如果vaLue不存在，那么提示内容。

            if (!value) {
                callback("密码不能为空!");
            } else {
                // 如果不为空，就直接调用函数不提示内容。
                //由于上面定义函数的参数是可选的，所以调用函数的时候可以不添加参数
                callback();
            }
        };
        // 校验规则
        const rules = reactive({

            username: [
                // message: 如果没有填写username,就会提示文字内容
                { required: true, message: "用户名不能为空！", trigger: "blue" },
            ],
            password: [
                { required: true, validator: validatePassword, trigger: "blue" },
                { min: 5, max: 10, message: '密码长度在 5 到 10 个字符', trigger: 'blur' }
            ],
        });


        //重置表单函数
        const resetForm = () => {
            ruleForm.username = "";
            ruleForm.password = "";
        };

        // 登录按钮操作
        const Login = () => {

            // 登录触发校验规则
            // 由于ruleFormRef是通过ref定义的，操作他需要利用.value
            // validate是element plus 中from表单方法，获取到from表单以后就可以直接调用了。
            ruleFormRef.value
                .validate()
                .then(() => {
                    // console.log("表单校验通过");
                    axios
                        .post("/login",{
                            username: ruleForm.username,
                            password: ruleForm.password,
                        })
                        .then((res) => {
                            console.log(res.data);
                            let username = res.data.tData.username;
                            console.log("username：",username);
                            let status = res.data.status
                            if (status === 200) {
                                sessionStorage.setItem("username",res.data.tData.username)
                                sessionStorage.setItem("token",res.data.tData.token)
                                router.push({path:'/sx_info_sync'});
                            } else {
                                // 调用重置表单函数
                                resetForm()
                                alert("登录失败,请检查用户名或密码是否正确！");
                                // console.log("登录失败，token值：", token);
                            }

                        });
                })
                .catch(() => {
                    // console.log("表单校验异常");
                    // alert("表单校验异常");
                });
        };

        return {resetForm, ruleForm, ruleFormRef, rules, Login};

    },
});


</script>

<style>

#building {
    background: url("../assets/images/bg5.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
.loginContainer {
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    background-position: left top;
    background-color: #242645;
    color: #fff;
    font-family: "Source Sans Pro";
    position: relative;
}

.formStyle {
    width: 20%;
    height: 60%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 60px 20px 60px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    background: linear-gradient(
            230deg,
            rgba(53, 57, 74, 0) 0%,
            rgb(0, 0, 0) 100%
    );
}

.submitBtn {
    background-color: transparent;
    color: #39f;
    width: 200px;
}
</style>
