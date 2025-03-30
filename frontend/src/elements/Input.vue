<template>
    <!-- :type="type" (mengikat atribut type agar dapat dikonfigurasi dari luar) -->
    <!-- :placeholder="placeholder" (mengikat placeholder agar dapat dikonfigurasi dari luar) -->
    <!-- :name="name" (menentukan nama input) -->
    <!-- :id="name" (menggunakan nama sebagai ID input) -->
    <!-- :value="modelValue" (mengikat nilai input dengan modelValue) -->
    <!-- @input=" (Ketika pengguna mengetik, event 'input' akan dipancarkan (emit) 
    dan mengupdate modelValue di parent component) -->
  
    <input
    :type="type" 
    :placeholder="placeholder"
    :name="name"
    :id="name"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="text-sm border rounded w-full py-2 px-2 text-slate-700 placeholder:opacity-50 focus:outline-none"
    required
    autocomplete="off"
  />
</template>

<script setup>

// mendeklarasikan properti yang dapat diterima oleh komponen ini dari parent
defineProps({
  type: String,         // properti untuk menentukan tipe input (text, password, email, dll.)
  placeholder: String,  // properti untuk placeholder input
  name: String,         // properti untuk nama input
  modelValue: String,   // properti modelValue agar input bisa digunakan dengan v-model
});

// mendefinisikan event 'update:modelValue', yang diperlukan untuk v-model dua arah
defineEmits(["update:modelValue"]);
</script>

<!-- opsi 2
<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :id="name"
    v-model="modelValue"
    class="text-sm border rounded w-full py-2 px-2 text-slate-700 placeholder:opacity-50 focus:outline-none"
    required
    autocomplete="off"
  />
</template>

<script setup>
defineProps({
  type: String,
  placeholder: String,
  name: String,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script> -->

<!-- opsi 1
<template>
  <input
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full px-3 py-2 border rounded-lg"
    required
    autocomplete="off"
  />
</template>

<script setup>
defineProps({
  name: String,
  type: String,
  placeholder: String,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script> -->
