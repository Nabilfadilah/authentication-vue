<template>
  <div class="p-6 bg-white shadow-md rounded-xl">
    <!-- Greeting -->
    <div class="flex items-center gap-4 mb-6">
      <div class="p-4 bg-indigo-100 rounded-full">
        <svg
          class="w-8 h-8 text-indigo-600"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-gray-800">
        Hello, <span class="text-indigo-600">{{ user?.name }}</span> 👋
      </h2>
    </div>

    <!-- User Detail Card -->
    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-medium text-gray-700 mb-4">User Details</h3>
      <div class="space-y-2 text-gray-600">
        <p>
          <span class="font-semibold">📧 Email:</span>
          {{ user?.email }}
        </p>
        <p>
          <span class="font-semibold">🛡️ Role:</span>
          {{ user?.role }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth"; // impor store autentikasi dari Pinia
import {useRouter} from "vue-router"; // impor 'useRouter' untuk navigasi setelah logi
import {computed} from "vue"; // impor 'computed' membuat nilai yang dihitung secara otomatis berdasarkan data
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
    return {handleLogout, user};
  },
};
</script>

<style></style>
