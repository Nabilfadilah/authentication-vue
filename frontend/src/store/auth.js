// impor 'defineStore' dari Pinia untuk membuat store manajemen state
import { defineStore } from "pinia";

// impor instance axios yang telah dikonfigurasi untuk melakukan HTTP request
import axiosInstance from "@/plugins/axiosInstance";

// mendefinisikan store autentikasi dengan nama 'auth'
export const useAuthStore = defineStore("auth", {
  // state: menyimpan data token dan user yang tersimpan di localStorage (jika ada)
  state: () => ({
    token: localStorage.getItem("token") || null, // ambil token dari localStorage atau null jika belum login
    user: JSON.parse(localStorage.getItem("user")) || null, // ambil data user dari localStorage atau null jika belum login
  }),

  // actions: berisi metode yang dapat mengubah state dan melakukan request ke server
  actions: {
    // fungsi login untuk mengautentikasi pengguna
    async login(email, password) {
      try {
        // melakukan HTTP POST request ke endpoint '/login' dengan email dan password
        const response = await axiosInstance.post("/login", { email, password });

        console.log("Response dari Backend:", response.data); // debugging untuk melihat respons dari backend

        // jika respons mengandung token, simpan ke state dan localStorage
        if (response.data.token) {
          this.token = response.data.token; // simpan token ke state
          this.user = response.data.user;   // simpan informasi user ke state

          // menyimpan token dan user ke localStorage agar tetap login setelah refresh
          localStorage.setItem("token", this.token);
          localStorage.setItem("user", JSON.stringify(this.user));
        } else {
          throw new Error("Token tidak ditemukan dalam respons server."); // jika token tidak ditemukan
        }
      } catch (error) {
        // menampilkan error ke console jika login gagal
        console.error("Login Error:", error.response?.data?.message || error.message);
        throw error; // melempar error agar bisa ditangani di komponen yang memanggil login
      }
    },

    // fungsi register untuk mendaftarkan pengguna baru
    async register(name, email, password) { 
      try {
        // melakukan HTTP POST request ke endpoint '/register' dengan data pendaftaran
        await axiosInstance.post("/register", {
          name,
          email,
          password,
        });
      } catch (error) {
        throw error; // melempar error agar bisa ditangani di komponen yang memanggil register
      }
    },

    // fungsi logout untuk menghapus data autentikasi pengguna
    async logout() {
      this.token = null; // menghapus token dari state
      this.user = null;  // menghapus data user dari state

      // menghapus token dan user dari localStorage agar pengguna benar-benar logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

// state menyimpan data global yang dapat diakses di seluruh aplikasi.
// actions digunakan untuk mengubah state dan menjalankan operasi seperti login, register, dan logout.
// Dengan Pinia, kode lebih terstruktur, mudah dipelihara, dan efisien dibandingkan mengelola state di dalam komponen.

// Gunakan store/auth.js jika ingin menyimpan data login secara global 