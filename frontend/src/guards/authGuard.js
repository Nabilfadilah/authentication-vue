// impor store autentikasi dari Pinia untuk mendapatkan status login pengguna
import { useAuthStore } from '@/store/auth';

// fungsi middleware untuk melindungi rute (route guard)
export default function authGuard(to, from, next) {
  // mengakses store autentikasi untuk memeriksa apakah pengguna sudah login
  const authStore = useAuthStore();

  // jika tidak ada token (belum login), arahkan pengguna ke halaman login
  if (!authStore.token) {
    next('/login'); // redirect ke halaman login
  } else {
    next(); // lanjutkan ke rute yang diminta
  }
}
