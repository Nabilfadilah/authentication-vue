<template>
  <label :for="htmlFor" class="block text-slate-700 text-sm font-bold mb-2">
    <!-- ':for="htmlFor"' menghubungkan label dengan input yang memiliki ID yang sesuai -->
    <!-- 'slot' digunakan agar teks label bisa disisipkan dari parent component -->
    <slot></slot>
  </label>
</template>

<script setup>

// mendeklarasikan properti yang dapat diterima oleh komponen ini dari parent
defineProps({
  htmlFor: String, // digunakan untuk menentukan ID input yang akan dikaitkan dengan label
});
</script>

<!-- opsi 1
<template>
  <label :for="htmlFor" class="block text-slate-700 text-sm font-bold mb-2">
    <slot></slot>
  </label>
</template>

<script setup>
// menggunakan defineProps untuk menerima prop
defineProps({
  htmlFor: String,
});
</script> -->
