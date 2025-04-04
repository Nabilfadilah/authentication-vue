<script setup>
import { defineProps } from 'vue';

// mendeklarasikan properti yang dapat diterima oleh komponen ini dari parent
defineProps({
  classText: {
    type: String,
    default: ''
  } // ini nama propsnya jangan "class" karena akan bentrok dengan "class" di html
});
</script>

<template>
  <p :class="`font-inter text-base ${className}`">
    <!-- 'slot' digunakan agar konten tombol bisa disesuaikan dari parent -->
    <slot />
  </p>
</template>
