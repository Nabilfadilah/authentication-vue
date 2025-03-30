// berfungsi sebagai service untuk autentikasi pengguna
import axiosInstance from '@/plugins/axiosInstance';

// fungsi untuk melakukan login pengguna
export const login = async (email, password) => {
  // mengirim HTTP POST request ke endpoint '/login' dengan email dan password
  return axiosInstance.post('/login', { email, password });
};

// fungsi untuk melakukan registrasi pengguna
export const register = async (data) => {
  // mengirim HTTP POST request ke endpoint '/register' dengan data pengguna yang dikirimkan
  return axiosInstance.post('/register', data);
};

// gunakan services/authService.js jika hanya ingin memanggil API tanpa mengelola state