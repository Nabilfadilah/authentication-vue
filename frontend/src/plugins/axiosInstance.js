import axios from 'axios';

// import useAuthStore dari store/auth untuk mengakses token autentikasi
import { useAuthStore } from '@/store/auth';

// membuat instance axios dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3200/api', // URL dasar untuk semua request API
  withCredentials: true, // memungkinkan pengiriman cookie untuk autentikasi
  headers: { "Content-Type": "application/json" } // mengatur tipe konten default sebagai JSON
});

// menambahkan interceptor pada request sebelum dikirim ke server
// menggunakan ini, agar tidak perlu menambahkan token secara manual setiap melakukan request ke API
axiosInstance.interceptors.request.use(config => {
  const authStore = useAuthStore(); // mengakses store untuk mendapatkan token autentikasi

  // jika token tersedia, tambahkan ke header Authorization
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }

  return config; // mengembalikan konfigurasi request yang telah dimodifikasi
});


export default axiosInstance;