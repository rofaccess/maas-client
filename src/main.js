import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router' //Import router variable from router folder

axios.defaults.baseURL = 'http://localhost:3000'

createApp(App).use(router).use(VueAxios, axios).mount('#app')
