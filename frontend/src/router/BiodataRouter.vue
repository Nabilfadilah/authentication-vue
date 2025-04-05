<template>
  <!-- gunakan komponen dinamis berdasarkan hasil dari 'componentToRender' -->
  <!-- <component :is="..."/> adalah fitur komponen dinamis dari Vue. untuk menampilkan komponen tertentu secara kondisional. -->
  <component :is="componentToRender" />
</template>

<script setup>
import { computed } from "vue"; // import fungsi 'computed' dari Vue
import { useAuthStore } from "@/store/auth"; // akses store auth
import BiodataList from "@/pages/BiodataList.vue";
import BiodataView from "@/pages/BiodataView.vue";

// memanggil useAuthStore() untuk mendapatkan data dari store auth, seperti authStore.user.role.
const authStore = useAuthStore();

// pilih komponen berdasarkan role
const componentToRender = computed(() =>
  // componentToRender adalah properti computed, artinya nilainya akan otomatis diperbarui jika authStore.user berubah.
  authStore.user?.role === "admin" ? BiodataList : BiodataView
);
</script>
