<script setup>
</script>

<template>
  <!-- membungkus seluruh tampilan dalam div dengan tinggi minimum layar -->
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <!-- komponen router-view digunakan untuk menampilkan halaman berdasarkan route -->
    <router-view />
  </div>
</template>

<style scoped>
</style>
