import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from "axios";
// import VueAxios from "vue-axios"

// main.js中引入Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  // 引入Element Plus icon 所需


// 配置请求根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 请求拦截器
axios.interceptors.request.use(config => {
    // 为请求头对象，添加 Token 验证的 Authorization 字段
    config.headers.Authorization = sessionStorage.getItem("token")
    // 在最后必须 return config
    return config
})

// 引入mock
import '@/mock/mock'

const app = createApp(App)
// 引入Element Plus icon 所需
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.config.globalProperties.$axios = axios

app.use(store)
    .use(Antd)
    .use(router)
    .use(ElementPlus)
    .mount('#app')

