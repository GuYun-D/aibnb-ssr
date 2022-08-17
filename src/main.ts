import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './language/i18n'

import aribnbb from './db'

router.beforeEach((to, from, next) => {
  aribnbb.airbnbDB.openStore({
    ...aribnbb.languageObjectStore,
    ...aribnbb.userObjectStore
  }).then((res: any) => {
    console.log("初始化所有对象仓库");
    next()
  })
})

const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
