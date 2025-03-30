<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <!-- menampilkan pesan error jika login gagal -->
      <p v-if="errorMessage" class="text-red-600 text-center mb-4">
        {{ errorMessage }}
      </p>

      <!-- form login -->
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <!-- mengambil dari elemet <InputForm /> -->
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Masukkan email"
            v-model="email"
          />
        </div>
        <div class="mb-4">
          <InputForm
            label="Password"
            name="password"
            type="password"
            placeholder="Masukkan password"
            v-model="password"
          />
        </div>

        <!-- tombol login -->
        <ButtonAll
          type="submit"
          class-button="w-full bg-blue-500 hover:bg-blue-600"
        >
          Login
        </ButtonAll>

        <!-- <ButtonAll
          type="submit"
          class="w-full bg-blue-500 hover:bg-yellow-600"
        >
          Login
        </ButtonAll> -->
      </form>

      <!-- link menuju halaman register -->
      <p class="mt-4 text-center text-gray-600">
        Belum punya akun?
        <router-link
          to="/register"
          class="text-blue-500 cursor-pointer hover:underline"
          >Daftar</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
// impor store autentikasi dari Pinia
import {useAuthStore} from "@/store/auth";

// impor 'ref' dari Vue untuk membuat state reaktif
import {ref} from "vue";

// impor 'useRouter' untuk navigasi setelah login
import {useRouter} from "vue-router";

import InputForm from "@/elements/InputForm.vue";
import ButtonAll from "@/elements/ButtonAll.vue";

export default {
  components: {InputForm, ButtonAll},
  setup() {
    // inisialisasi store autentikasi menggunakan Pinia
    const authStore = useAuthStore();

    // state untuk menyimpan email dan password yang dimasukkan pengguna
    const email = ref(""); // input email
    const password = ref(""); // input password
    const errorMessage = ref(""); // menyimpan pesan error jika login gagal

    // router digunakan untuk navigasi ke halaman lain setelah login
    const router = useRouter();

    // fungsi untuk menangani proses login
    const handleLogin = async () => {
      try {
        // memanggil fungsi login dari store 'authStore' dan mengirim email & password
        await authStore.login(email.value, password.value);

        // jika login berhasil, arahkan pengguna ke halaman dashboard
        router.push("/dashboard");
      } catch (error) {
        // jika login gagal, tampilkan pesan error
        errorMessage.value =
          error.response?.data?.message || "User tidak ditemukan!";
      }
    };

    // mengembalikan variabel agar bisa digunakan dalam template
    return {email, password, handleLogin, errorMessage};
  },
};
</script>

<style></style>
