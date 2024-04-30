import '@/styles/normalize.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'

// element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

// uno
import 'virtual:uno.css'

// svg-icon
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon.vue'

const app = createApp(App)

app.component('svg-icon', SvgIcon)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
