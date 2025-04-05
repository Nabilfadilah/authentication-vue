<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h2 class="p-5 bg-fuchsia-700 text-green-600 text-2xl font-bold">
      Hello, {{ user?.name }} 👋
    </h2>

    <div class="p-6 mb-5 bg-white rounded-lg shadow-md text-center">
      <h3 class="text-xl font-semibold text-gray-800">User Details</h3>
      <p class="text-gray-700 mt-2"><strong>Email:</strong> {{ user?.email }}</p>
      <p class="text-gray-700"><strong>Role:</strong> {{ user?.role }}</p>
    </div>

    <div class="flex items-center gap-3">
      <ButtonAll>
        <RouterLink to="/biodata">
          Biodata
        </RouterLink>
      </ButtonAll>

      <ButtonAll 
        v-if="user?.role === 'admin'"
        class="bg-blue-500 hover:bg-blue-800"
      >
        <RouterLink to="/users">
          User List
        </RouterLink>
      </ButtonAll>
      <ButtonAll 
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-800"
      >
        Logout
      </ButtonAll>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth"; // impor store autentikasi dari Pinia
import { useRouter } from "vue-router"; // impor 'useRouter' untuk navigasi setelah logi
import { computed } from "vue"; // impor 'computed' membuat nilai yang dihitung secara otomatis berdasarkan data
import ButtonAll from "@/elements/ButtonAll.vue";

export default {
  components: {ButtonAll},
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