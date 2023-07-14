<!--教学地址：https://blog.csdn.net/weixin_39237340/category_11504745.html-->

<template>
    <div class="common-layout">
    <el-container class="home_container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="@/assets/images/right.png" style="width: 50px; height: 50px;" alt="">
                <span>后台管理</span>
            </div>
            <div>
              <el-row v-if="username!=''" style="white-space:nowrap;">
                  <el-avatar> {{username}} </el-avatar>
                  <el-button type="info" @click="logout">退出</el-button>
              </el-row>
              <el-row v-else>
<!--                  <el-col class="el-col" :span="3">您还未登录 ！</el-col>-->
                  <el-button type="info" @click="login">登录</el-button>
              </el-row>
<!--              <el-button type="info" @click="logout">退出</el-button>-->
            </div>

        </el-header>

        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>

                    <!--通过接口请求，生成左侧菜单-->
<!--                <el-menu-->
<!--                    active-text-color="#409Eff"-->
<!--                    background-color="#545c64"-->
<!--                    text-color="#fff"-->
<!--                    unique-opened-->
<!--                    :collapse="isCollapse"-->
<!--                    :collapse-transition="false"-->
<!--                    :router="true" :default-active="activePath">-->

<!--                    &lt;!&ndash; 一级菜单 &ndash;&gt;-->
<!--                    <el-sub-menu :index="item.id+''" v-for="item in menulist.data" :key="item.id">-->
<!--                        &lt;!&ndash; 一级菜单模板区域 &ndash;&gt;-->
<!--                        <template #title>-->
<!--                            <el-icon><location /></el-icon>-->
<!--                            <span>{{ item.authName }}</span>-->
<!--                        </template>-->
<!--                        &lt;!&ndash; 二级菜单 &ndash;&gt;-->
<!--&lt;!&ndash;                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">&ndash;&gt;-->
<!--                        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">-->
<!--                        <template #title>-->
<!--                                <el-icon><iconMenu /></el-icon>-->
<!--                                <span>{{ subItem.authName }}</span>-->
<!--                            </template>-->
<!--                        </el-menu-item>-->
<!--                    </el-sub-menu>-->
<!--                </el-menu>-->

                <!--通过路由信息生成左侧菜单-->
                <el-menu
                        active-text-color="#409Eff"
                        background-color="#545c64"
                        text-color="#fff"
                        unique-opened
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :router="true" :default-active="activePath">

                    <!-- 一级菜单 -->
                    <el-sub-menu :index="item.path" v-for="item in menulist.children" :key="item.path">
                        <!-- 一级菜单模板区域 -->
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">
                            <template #title>
                                <el-icon><iconMenu /></el-icon>
                                <span>{{ subItem.name }}</span>
                            </template>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体区域 -->
            <el-container>
            <el-main>
                <!-- 面包屑导航区域 -->
                <div>
                    <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <template v-for="(item, index) in breadList">
                            <el-breadcrumb-item v-if="item.name" :key="index" :to="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </template>
                    </el-breadcrumb>
                </div>
                <!--main路由渲染入口-->
                <router-view></router-view>
            </el-main>
            <el-footer style="--el-footer-height: auto;">
                <Footer></Footer>
            </el-footer>
            </el-container>
        </el-container>
    </el-container>
    </div>
</template>
<script>
import axios from "axios";
import {ElemeFilled, Location} from "@element-plus/icons-vue";
import Footer from '@/layout/footer.vue'  // 导入页脚
export default {
    components: {Location, ElemeFilled, Footer},
    data () {
        return {
            // 左侧菜单数据对象
            menulist: [],
            // 面包屑数据对象
            breadList: [],

            // 左侧菜单是否折叠
            isCollapse: false,
            //  被激活高亮的链接地址
            activePath: '',
            // 登录状态检测
            msg: "",
            username: "",

        }
    },
    created () {
        // this.getMenuList()
        this.activePath = sessionStorage.getItem('activePath')
        // 检查登录状态
        this.checkLogin()
        // 面包屑导航
        this.getMatched()


    },
    methods: {

        // 面包屑导航
        getMatched() {
            this.breadList = this.$route.matched;
            // this.menulist = this.$router.options.routes[1];
            this.menulist = this.breadList[0];
            console.log(this.menulist)
        },

      // 面包屑导航
        watch: {
            $route(to,from) {
                this.breadList = this.$route.matched;
            }
        },

        checkLogin() {
            // let token = JSON.parse(sessionStorage.getItem("token"));
            let username = sessionStorage.getItem("username");
            let token = sessionStorage.getItem("token");
            if (username && token) {
                this.username = username
            }
        },
        login () {
            this.$router.push({path: "/login"})
        },
        logout () {
            // window.sessionStorage.clear()
            // this.$router.push('/login')
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
            this.$message({
                message: '注销成功！',
                type: 'success'
            });
            this.$router.push({path: "/login"})
        },
        // 获取所有的菜单数据
        // async  getMenuList () {
        //     // const { data: res } = await this.$http.get('menus')
        //     // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        //     // // 成功了，进行赋值
        //     // this.menulist = res.data
        //     // console.log(res)
        //     axios.get("/layout",)
        //         .then((res) => {
        //             // console.log(res.data);
        //             this.menulist = res.data
        //         })
        // },

        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse () {
            this.isCollapse = !this.isCollapse
        },
        saveNavState (activePath) {
            sessionStorage.setItem('activePath', activePath)
            this.activePath = sessionStorage.getItem('activePath')
        }
    }
}
</script>
<style lang="less" scoped>
.home_container {
    height: 100%;
}
.el-header {
    background-color: #363d40;
    // 给头部设置一下弹性布局
    display: flex;
    // 让它贴标左右对齐
    justify-content: space-between;
    // 清空图片左侧padding
    padding-left: 0;
    // 按钮居中
    align-items: center;
    // 文本颜色
    color: #fff;
    // 设置文本字体大小
    font-size: 20px;
    // 嵌套
    > div {
        // 弹性布局
        display: flex;
        // 纵向上居中对齐
        align-items: center;
        // 给文本和图片添加间距，使用类选择器
        span {
            margin-left: 15px;
        }
    }
}
.el-aside {
    background-color: #313743;
}
.el-main {
    background-color: #e9edf1;
}
.iconfont {
    margin-right: 10px;
}
.toggle-button{
    // 添加背景颜色
    background-color: #4A5064;
    // 设置文本大小
    font-size:10px;
    // 设置文本行高
    line-height:24px;
    // 设置文本颜色
    color:#fff;
    // 设置文本居中
    text-align: center;
    // 设置文本间距
    letter-spacing: 0.2em;
    // 设置鼠标悬浮变小手效果
    cursor:pointer;
}
/* 全局样式表 */
html,body,#app{
    /* 高度占100% */
    height: 100%;
    /* margin重置为0 */
    margin: 0;
    /* padding重置为0 */
    padding: 0;
}
.el-breadcrumb{
    /* 设置下拉距 */
    margin-bottom: 15px;
    /* 重置字体大小 */
    font-size: 12px;
}
.el-card{
    box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
}
.el-table{
    margin-top: 15px;
    font-size: 12px;
}
.logout {
  white-space:nowrap;
  float:right;
}
.el-col {
  font-size: 20px;
}
</style>
