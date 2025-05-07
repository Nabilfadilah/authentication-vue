<template>
  <header
    class="bg-white p-4 flex justify-between items-center fixed w-full top-0 z-50"
  >
    <!-- tombol menu untuk mobile -->
    <button class="md:hidden text-2xl" @click="$emit('toggleSidebar')">
      ☰
    </button>

    <!-- menu dropdown mobile -->
    <transition name="fade">
      <!-- menu navigasi mobile yang hanya muncul jika mobileMenuOpen bernilai true -->
      <div
        v-if="mobileMenuOpen"
        class="absolute top-16 right-4 bg-white shadow-md p-4 rounded-md z-50 md:hidden"
      >
        <!-- loop setiap item di navItems dan buat link navigasi -->
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="block py-2 px-4 hover:bg-gray-100"
          @click="mobileMenuOpen = false"
        >
          <!-- tampilkan nama menu seperti "Dashboard", "User List", dll -->
          {{ item.name }}
        </router-link>
        <!-- v-for="item in navItems"        = iterasi setiap item dalam array navItems -->
        <!-- :key="item.name"                = key unik untuk optimasi rendering -->
        <!-- :to="item.path"                 = arahkan ke path menggunakan Vue Router -->
        <!-- class                           = styling dengan Tailwind  -->
        <!-- @click="mobileMenuOpen = false" = tutup menu mobile saat link diklik -->
      </div>
    </transition>
  </header>
</template>

<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/store/auth";
import {useRouter} from "vue-router";
import {defineEmits} from "vue";

// status menu mobile terbuka/tidak
const mobileMenuOpen = ref(false);

// fungsi toggle menu mobile (tidak digunakan di template, bisa dihapus atau dipakai nanti)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// daftar menu statis (bisa dikondisikan juga pakai role seperti di sidebar)
const navItems = [
  {name: "Dashboard", path: "/dashboard"},
  {name: "User List", path: "/users"},
  {name: "Biodata List", path: "/biodata"},
];

// inisialisasi store autentikasi menggunakan Pinia
const authStore = useAuthStore();

// router digunakan untuk navigasi ke halaman lain
const router = useRouter();

// emit event toggleSidebar ke parent
const emit = defineEmits(["toggleSidebar"]);
</script>

<style scoped>
/* animasi fade untuk dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
