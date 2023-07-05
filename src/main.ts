import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from "axios";
// import VueAxios from "vue-axios"

// main.js中引入ElementUI
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";



// 引入mock
import '@/mock/mock'

const app = createApp(App)
app.config.globalProperties.$axios = axios
// app.use(VueAxios, axios).mount('#app')

app.use(store)
    .use(Antd)
    .use(router)
    .use(ElementPlus)
    // .use(VueAxios)
    .mount('#app')

