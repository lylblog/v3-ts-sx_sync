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

