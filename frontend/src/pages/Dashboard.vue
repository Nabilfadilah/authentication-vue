<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h2 class="p-5 bg-fuchsia-700 text-green-600 text-2xl font-bold">
      Hello, {{ user?.name }} 👋
    </h2>

    <div class="p-6 bg-white rounded-lg shadow-md text-center">
      <h3 class="text-xl font-semibold text-gray-800">User Details</h3>
      <p class="text-gray-700 mt-2"><strong>Email:</strong> {{ user?.email }}</p>
      <p class="text-gray-700"><strong>Role:</strong> {{ user?.role }}</p>
    </div>

    <button 
      @click="handleLogout"
      class="mt-5 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth"; // impor store autentikasi dari Pinia
import { useRouter } from "vue-router"; // impor 'useRouter' untuk navigasi setelah logi
import { computed } from "vue"; // impor 'computed' membuat nilai yang dihitung secara otomatis berdasarkan data

export default {
  setup() {
    // inisialisasi store autentikasi menggunakan Pinia
    const authStore = useAuthStore(); 

    // router digunakan untuk navigasi ke halaman lain
    const router = useRouter();

    // setiap kali authStore.user berubah, user juga akan otomatis diperbarui.
    const user = computed(() => authStore.user); // ambil data user dari store

    const handleLogout = async () => {
      await authStore.logout(); // panggil fungsi logout dari store/auth.js
      router.push("/login"); // arahkan kembali ke halaman login setelah logout
    };

    // mengembalikan variabel agar bisa digunakan dalam template
    return { handleLogout, user };
  },
}
</script>

<style>

</style>