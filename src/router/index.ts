// 1. 引入这两个函数来初始化路由
import {createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import MyCount from '../views/CountPage.vue'
// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    // login
    {
        path: "/login",
        name: "登录",
        component: () => import('../views/login.vue'),
        meta: {
            isShow: false,
        },
    },
    {
        path: '',
        component: () => import('../layout/layout.vue'),
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: '首页',
                component: () => import('../layout/home.vue'),
            },
            {
                path: "/content",
                name: "政务",
                // icon: "Tickets",
                // component: rightView,
                children: [
                    // 事项同步
                    {
                        path: '/sx_info_sync',
                        name: '事项同步',
                        component: () => import('../views/sx_info_sync.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                ]
            },
            {
                path: "/operation",
                name: "运营",
                // icon: "DataLine",
                // component: rightView,
                children: [
                    // 计数器路由
                    {
                        path: '/count',
                        name: '计数器',
                        component: MyCount,
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 图片轮播路由
                    {
                        path: '/imageshow',
                        name: '图片轮播',
                        component: () => import('../views/ImageShow.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // todoList记事本路由
                    {
                        path: '/todo',
                        name: '记事本',
                        component: () => import('../views/TodoList.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 天气查查查路由
                    {
                        path: '/weather',
                        name: '天气查查查',
                        component: () => import('../views/WeatherPage.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 知心姐姐聊天
                    {
                        path: '/chat',
                        name: '知心姐姐聊天',
                        component: () => import('../views/ChatPage.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 手机品牌管理
                    {
                        path: '/phone',
                        name: '手机品牌管理',
                        component: () => import('../views/PhonePage.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 天知道天气查看
                    {
                        path: '/weathernew',
                        name: '天知道天气查看',
                        component: () => import('../views/WeatherNew.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 悦听音乐播放器
                    {
                        path: '/musicplayer',
                        name: '悦听音乐播放器',
                        component: () => import('../views/MusicPlayer.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                    },
                    // 黑云音乐播放器
                    {
                        path: '/blackmusic',
                        name: '黑云音乐播放器',
                        component: () => import('../views/MyPlayer/IndexPage.vue'),
                        meta: {
                            requireAuth: true,
                            isShow: true,
                        },
                        // ↓子路由
                        children: [

                            {
                                path: 'result/:search?',
                                component: () => import(/* webpackChunkName: "myplayer" */ '../views/MyPlayer/ResultPage.vue')
                            },
                            {
                                path: 'player/:id?',
                                component: () => import(/* webpackChunkName: "myplayer" */ '../views/MyPlayer/PlayerPage.vue')
                            },
                            {
                                path: 'video/:mvid?',
                                component: () => import(/* webpackChunkName: "myplayer" */ '../views/MyPlayer/VideoPage.vue')
                            },
                            {
                                path: 'comment/:id?',
                                component: () => import(/* webpackChunkName: "myplayer" */ '../views/MyPlayer/CommentPage.vue')
                            }
                        ]
                    },

                ]
            },
            // {
            //     path: "/user",
            //     name: "用户",
            //     // icon: "User",
            //     component: () => import('../layout/user.vue'),
            //     children: [
            //         {
            //             path: "list",
            //             name: "用户列表",
            //             icon: "UserFilled",
            //             component: userList
            //         },
            //         {
            //             path: "reset-password",
            //             name: "密码重置",
            //             icon: "Lock",
            //             component: adminResetPwd
            //         },
            //         {
            //             path: "email",
            //             name: "邮箱重置",
            //             icon: "Promotion",
            //             component: adminEmail
            //         },
            //         {
            //             path: "info",
            //             name: "信息重置",
            //             icon: "InfoFilled",
            //             component: adminInfo
            //         }
            //     ]
            // },
            // {
            //     path: "/settings",
            //     name: "设置",
            //     icon: "Setting",
            //     component: rightView,
            //     children: [
            //         {
            //             path: "website-info",
            //             name: "站点信息",
            //             icon: "CreditCard",
            //             component: websiteInfo
            //         },
            //         {
            //             path: "friend-link",
            //             name: "友情链接",
            //             icon: "Link",
            //             component: friendLink
            //         }
            //     ]
            // }
        ]
    },
    // 404
    {
        path:'/:pathMatch(.*)*',
        component:()=>import('../views/404.vue'),
        meta: {
            isShow: false,
        },
    },
]

// 创建路由实例
const router = createRouter({
    // history: createWebHashHistory(), // createWebHashHistory  表示使用hash模式，即url会有#前缀
    history: createWebHistory(process.env.BASE_URL),  // createWebHistory路由模式路径不带#号(生产环境下不能直接访问项目，需要nginx转发)
    routes
})

// 监听路由拦截，比如权限验证。
router.beforeEach((to, from, next) => {
    // to 即将进入的路由
    // from 在哪个路由进入的
    // next 放行
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if(sessionStorage.getItem('token')){ //判断本地是否存在token
            next();
        }else {
            // if(to.path === '/login_new'){
            //     next();
            // }else {
                alert('请先进行登录！')
                next({
                    path:'/login_new',
                    query: {redirect: to.fullPath}
                })
            // }
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if(to.fullPath === "/login_new"){
        if(sessionStorage.getItem('token')){
            alert('您已经登录了，如果想要登录其他账号，请先退出当前账号！')
            next({
                path:from.fullPath
            });
        }else {
            next();
        }
    }
});

export default router

