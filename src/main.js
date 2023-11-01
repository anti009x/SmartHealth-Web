import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './app.css'
import './app.js'
import store from './store'
import iziToast from 'izitoast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(iziToast)
app.use(VueSweetalert2);
app.mount('#app')
app.config.globalProperties.$redirect = (page) => { router.push(page) }
AOS.init(); 