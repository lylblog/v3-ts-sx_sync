import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MyCount from '../views/CountPage.vue'

const routes: Array<RouteRecordRaw> = [
    // 默认路由
    {
        path: '/',
        redirect: '/sx_info_sync'
    },

    // 事项同步
    {
        path: '/sx_info_sync',
        name: 'sx_info_sync',
        component: () => import('../views/sx_info_sync.vue')
    },
    // 计数器路由
    {
        path: '/count',
        name: 'count',
        component: MyCount
    },
    // 图片轮播路由
    {
        path: '/imageshow',
        name: 'imageshow',
        component: () => import('../views/ImageShow.vue')
    },
    // 图片轮播路由
    {
        path: '/imageshow',
        name: 'imageshow',
        component: () => import('../views/ImageShow.vue')
    },
    // todoList路由
    {
        path: '/todo',
        name: 'todo',
        component: () => import('../views/TodoList.vue')
    },
    // 天气查查查路由
    {
        path: '/weather',
        name: 'weacher',
        component: () => import('../views/WeatherPage.vue')
    },
    // 知心姐姐聊天
    {
        path: '/chat',
        name: 'chat',
        component: () => import('../views/ChatPage.vue')
    },
    // 手机品牌管理
    {
        path: '/phone',
        name: 'phone',
        component: () => import('../views/PhonePage.vue')
    },
    // 天知道天气查看
    {
        path: '/weathernew',
        name: 'weahernew',
        component: () => import('../views/WeatherNew.vue')
    },
    // 悦听音乐播放器
    {
        path: '/musicplayer',
        name: 'musicplayer',
        component: () => import('../views/MusicPlayer.vue')
    },
    // 黑云音乐播放器
    {
        path: '/blackmusic',
        name: 'blackmusic',
        component: () => import('../views/MyPlayer/IndexPage.vue'),
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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
