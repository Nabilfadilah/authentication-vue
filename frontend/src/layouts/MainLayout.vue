<template>
  <!-- kontainer utama layout -->
  <div class="flex h-screen relative">

    <!-- sidebar, menerima prop isOpen dan emit event close -->
    <Sidebar :isOpen="isSidebarOpen" @close="toggleSidebar" class="z-50" />

    <!-- konten utama layout -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar, mengirimkan event toggleSidebar -->
      <Navbar @toggleSidebar="toggleSidebar" />

      <!-- isi halaman, router-view -->
      <main class="flex-1 overflow-y-auto p-4 mt-16 bg-gray-100">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

// state sidebar terbuka atau tidak
const isSidebarOpen = ref(false);

// fungsi untuk membuka/menutup sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
