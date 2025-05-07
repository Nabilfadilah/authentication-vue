// impor fungsi untuk membuat router dan menentukan mode navigasi (history mode)
import { createRouter, createWebHistory } from 'vue-router';

// impor komponen halaman yang akan digunakan dalam routing
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import UserList from '@/pages/UserList.vue';
import UserEdit from '@/components/UserEdit.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import BiodataRouter from './BiodataRouter.vue';

// impor authGuard untuk melindungi halaman tertentu dari akses tanpa login
import authGuard from '../guards/authGuard';
import BiodataCreate from '@/components/BiodataCreate.vue';
import BiodataEdit from '@/components/BiodataEdit.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// daftar route dalam aplikasi
const routes = [
  {
    path: '/',
    component: MainLayout,
    beforeEnter: authGuard,
    children: [
      { path: '/dashboard', component: Dashboard, beforeEnter: authGuard }, // route dashboard hanya bisa diakses jika sudah login
      { path: '/users', component: UserList, beforeEnter: authGuard }, // route userlist hanya bisa diakses jika sudah login
      { path: '/users/:id', component: UserEdit, beforeEnter: authGuard },
      { path: '/admin/reset-password/:id', component: ResetPassword, beforeEnter: authGuard},  
      { path: '/biodata', component: BiodataRouter, beforeEnter: authGuard },
      { path: '/biodata/create', component: BiodataCreate, beforeEnter: authGuard },
      { path: '/biodata/edit/:id', component: BiodataEdit, beforeEnter: authGuard },
    ]
  },
  {
    path: '/',
    component: AuthLayout, // layout tanpa sidebar/nav
    children: [
      { path: '/login', component: Login },         // route untuk halaman login
      { path: '/register', component: Register },   // route untuk halaman register
    ]
  }
]

// membuat instance router dengan mode history agar URL terlihat lebih bersih
const router = createRouter({
  history: createWebHistory(), // menggunakan history mode agar tidak ada '#' di URL
  routes, // menggunakan daftar rute yang telah didefinisikan
});

export default router;
