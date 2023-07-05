<template>
    <div class="logout">
        <el-row v-if="username!=''" style="white-space:nowrap;">
            <el-col class="el-col" :span="3" style="min-width: 40%;">欢迎您：</el-col>
            <el-col class="el-col" :span="4" style="min-width: 40%;">{{username}}!</el-col>
            <a @click="loginout()">注销</a>
        </el-row>
        <el-row v-else>
            <el-col class="el-col" :span="3">您还未登录！</el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "",
            username: "",
            // token: ""
        }
    },
    created() {
        this.checkLogin()
    },
    methods: {
        checkLogin() {
            // let token = JSON.parse(sessionStorage.getItem("token"));
            let username = sessionStorage.getItem("username");
            if (username) {
                this.username = username
            }
        },
        loginout() {
            sessionStorage.removeItem("token")
            this.$message({
                message: '注销成功！',
                type: 'success'
            });
            this.$router.push({
                path: "/"
            })
        }
    }
}
</script>

<style>
.logout {
    white-space:nowrap;
    float:right;
}
.el-col {
    font-size: 20px;
}
</style>
