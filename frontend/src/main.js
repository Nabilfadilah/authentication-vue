import './assets/main.css';

// impor fungsi 'createPinia' untuk state management dengan Pinia
import { createPinia } from 'pinia';

// impor fungsi 'createApp' untuk membuat aplikasi Vue
import { createApp } from 'vue';

// impor router yang digunakan untuk navigasi antar halaman
import router from './router';

import App from './App.vue';

// membuat instance aplikasi Vue berdasarkan komponen utama 'App.vue'
const app = createApp(App);

// menggunakan Pinia sebagai state management dalam aplikasi
app.use(createPinia());

// menggunakan Vue Router untuk navigasi antar halaman
app.use(router);

// memasang aplikasi pada elemen dengan id 'app' di file index.html
app.mount('#app');
