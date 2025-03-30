<template>
    <button
      :class="['h-7 px-3 py-1 text-sm font-semibold rounded-md text-white', classButton]"
      :type="type"
      @click="onClick"
    >
      <!-- 'slot' digunakan agar konten tombol bisa disesuaikan dari parent -->
      <slot /> 
    </button>
  </template>

<script setup>

// mendeklarasikan properti yang dapat diterima oleh komponen ini dari parent
defineProps({
  classButton: { type: String, default: "bg-black" }, // ini nama propsnya jangan "class" karena akan bentrok dengan "class" di html
  type: { type: String, default: "button" }, // 'type' menentukan jenis tombol, defaultnya adalah "button".
  onClick: { type: Function, default: () => {} }, // defaultnya adalah fungsi kosong agar tidak menyebabkan error jika tidak diisi
});
</script>
