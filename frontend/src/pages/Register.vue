<template>
 <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      
      <!-- menampilkan pesan sukses -->
      <p v-if="successMessage" class="text-green-600 text-center mb-4">{{ successMessage }}</p>

      <!-- form login -->
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700">Nama</label>
          <input type="text" v-model="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input type="email" v-model="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input type="password" v-model="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>

        <!-- tombol register -->
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Register
        </button>
      </form>

      <!-- link menuju halaman login -->
      <p class="mt-4 text-center text-gray-600">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-500 cursor-pointer hover:underline">Masuk</router-link>
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

export default {
  setup() {
    const authStore = useAuthStore();  // inisialisasi store autentikasi menggunakan Pinia
    const name = ref(""); // input name
    const email = ref(""); // input email
    const password = ref(""); // input password
    const successMessage = ref(""); // menyimpan pesan success jika login gagal

    // router digunakan untuk navigasi ke halaman lain setelah register
    const router = useRouter();

    const handleRegister = async () => {
      try {
        // memanggil fungsi register dari store 'authStore' dan mengirim name, email & password
        await authStore.register(name.value, email.value, password.value);
       
        // pesan sukses
        successMessage.value = "Register berhasil!";

        // redirect setelah 2,5 detik
        setTimeout(() => {
          // jika register berhasil, arahkan ke halaman login setelah 2,5 detik
          router.push("/login");
        }, 2500);
      } catch (error) {
        // jika login gagal, tampilkan pesan error
        console.error("Error:", error.response?.data?.message || error.message);
      }
    };

    // mengembalikan variabel agar bisa digunakan dalam template
    return { name, email, password, handleRegister, successMessage };
  },
}
</script>

<style>

</style>