// 1. 引入这两个函数来初始化路由
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MyCount from '../views/CountPage.vue'
// 2. 配置路由
const routes: Array<RouteRecordRaw> = [

    // 默认路由
    {
        path: '/',
        // ↓重定向
        redirect: '/login_new'
        // redirect: { name: 'home' },
    },
    // login_new
    {
        path: '/login_new',
        name: 'login_new',
        component: () => import('../views/login_new.vue')
    },

    // login
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        // 路由元信息，随你怎么定义，笔者一般采用这种方式来定义路由权限然后结合路由拦截，
        // 下面的 auth：true 表示需要授权登录才可以进入此页面。
        meta: {
            requireAuth: true,
        },
    },

    // 事项同步
    {
        path: '/sx_info_sync',
        name: 'sx_info_sync',
        component: () => import('../views/sx_info_sync.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 计数器路由
    {
        path: '/count',
        name: 'count',
        component: MyCount,
        meta: {
            auth: true,
        },
    },
    // 图片轮播路由
    {
        path: '/imageshow',
        name: 'imageshow',
        component: () => import('../views/ImageShow.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 图片轮播路由
    {
        path: '/imageshow',
        name: 'imageshow',
        component: () => import('../views/ImageShow.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // todoList路由
    {
        path: '/todo',
        name: 'todo',
        component: () => import('../views/TodoList.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 天气查查查路由
    {
        path: '/weather',
        name: 'weacher',
        component: () => import('../views/WeatherPage.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 知心姐姐聊天
    {
        path: '/chat',
        name: 'chat',
        component: () => import('../views/ChatPage.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 手机品牌管理
    {
        path: '/phone',
        name: 'phone',
        component: () => import('../views/PhonePage.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 天知道天气查看
    {
        path: '/weathernew',
        name: 'weahernew',
        component: () => import('../views/WeatherNew.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 悦听音乐播放器
    {
        path: '/musicplayer',
        name: 'musicplayer',
        component: () => import('../views/MusicPlayer.vue'),
        meta: {
            requireAuth: true,
        },
    },
    // 黑云音乐播放器
    {
        path: '/blackmusic',
        name: 'blackmusic',
        component: () => import('../views/MyPlayer/IndexPage.vue'),
        meta: {
        requireAuth: true,
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
    }
]

// 3. 创建路由实例
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),  // 表示使用hash模式，即url会有#前缀
    routes
})

// 监听路由拦截，比如权限验证。
router.beforeEach((to, from, next) => {
    // to 即将进入的路由
    // from 在哪个路由进入的
    // next 放行
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        let locatoken = localStorage.getItem('token')
        console.log(locatoken)
        if(localStorage.getItem('token')){ //判断本地是否存在token
            next();
        }else {
            if(to.path === '/login_new'){
                next();
            }else {
                alert('请先进行登录！')
                next({
                    path:'/login_new'
                })
            }
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if(to.fullPath == "/login_new"){
        if(localStorage.getItem('token')){
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

