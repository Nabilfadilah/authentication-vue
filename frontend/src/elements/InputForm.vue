<template>
  <div class="mb-6">
     <!-- element Label untuk menampilkan teks label yang terhubung dengan input -->
    <Label :htmlFor="name">{{ label }}</Label>

    <!-- element Input untuk memasukkan data -->
    <Input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
     <!-- @update:modelValue (meneruskan event perubahan modelValue ke parent component) -->
  </div>
</template>

<script setup>
import Label from "./Label.vue";
import Input from "./Input.vue";

// mendeklarasikan properti yang dapat diterima oleh komponen ini dari parent
defineProps({
  label: String,       // properti teks label yang akan ditampilkan
  name: String,        // nama input yang digunakan untuk atribut name dan id
  type: String,        // tipe input (text, password, email, dll.)
  placeholder: String, // placeholder untuk input
  modelValue: String,  // nilai yang diikat dengan v-model untuk input
});

defineEmits(["update:modelValue"]); // memungkinkan emit perubahan dari child ke parent
</script>

<!-- opsi 2
<template>
  <div class="mb-6">
    <Label :htmlFor="name">{{ label }}</Label>
    <Input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      v-model="modelValue"
    />
  </div>
</template>

<script setup>
import Label from "./Label.vue";
import Input from "./Input.vue";

defineProps({
  label: String,
  name: String,
  type: String,
  placeholder: String,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script> -->

<!-- 
opsi 1
<template>
    <div class="mb-6">
      <Label :htmlFor="name">{{ label }}</Label>
      <Input
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        required
      />
    </div>
</template>
  

<script setup>
import Label from "./Label.vue";
import Input from "./Input.vue";

defineProps({
  label: String,
  name: String,
  type: String,
  placeholder: String,
  modelValue: String,
});

defineEmits(["update:modelValue"]); // memungkinkan komponen ini mengupdate nilai yang dikirim dari parent
</script> -->
