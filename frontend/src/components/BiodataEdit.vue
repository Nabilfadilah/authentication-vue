<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-bold">Edit Biodata</Typography>
      <ButtonAll>
        <router-link to="/biodata">⬅ Back</router-link>
      </ButtonAll>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Input Name -->
      <div class="mb-3">
        <InputForm
          label="Nama"
          type="text"
          name="name"
          v-model="formData.name"
          @input="handleInputChange"
          required
        />
      </div>

      <!-- Input Email -->
      <div class="mb-3">
        <InputForm
          label="Email"
          type="email"
          name="email"
          v-model="formData.email"
          @input="handleInputChange"
          required
        />
      </div>

      <!-- Input Phone -->
      <div class="mb-3">
        <InputForm
          label="No Telepon"
          type="text"
          name="phone"
          v-model="formData.phone"
          @input="handleInputChange"
          required
        />
      </div>

      <!-- Input Address -->
      <div class="mb-3">
        <InputForm
          label="Alamat"
          type="text"
          name="address"
          v-model="formData.address"
          @input="handleInputChange"
          required
        />
      </div>

      <!-- Input Foto -->
      <div class="mb-3">
        <Label>Upload Foto</Label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          @change="handleInputChange"
          class="input"
        />
        <div v-if="photoPreview" class="mt-2">
          <img
            :src="photoPreview"
            alt="Preview"
            class="w-32 h-32 object-cover rounded"
          />
        </div>
      </div>

      <!-- Submit -->
      <ButtonAll
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600"
      >
        Update Biodata
      </ButtonAll>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import axiosInstance from "@/plugins/axiosInstance";
import {useAuthStore} from "@/store/auth";
import Typography from "@/elements/Typography.vue";
import ButtonAll from "@/elements/ButtonAll.vue";
import InputForm from "@/elements/InputForm.vue";
import Label from "@/elements/Label.vue";

// ambil ID dari route
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const authStore = useAuthStore();

// state form
const formData = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  photo: null,
});

const photoPreview = ref(null);

// ambil data biodata berdasarkan ID
onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/biodata/${id}`);
    formData.value = {
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      address: response.data.address,
      photo: null, // kosongkan dulu, karena ini untuk input file baru
    };

    if (response.data.photo) {
      photoPreview.value = response.data.photo;
    }
  } catch (error) {
    console.error("Gagal ambil biodata:", error);
  }
});

// handle input
const handleInputChange = (e) => {
  const {name, value, type, files} = e.target;

  if (type === "file") {
    const file = files[0];
    if (file) {
      formData.value.photo = file;
      photoPreview.value = URL.createObjectURL(file);
    }
  } else {
    formData.value[name] = value;
  }
};

// handle submit
const handleSubmit = async () => {
  try {
    const data = new FormData();
    for (const key in formData.value) {
      // hanya tambahkan photo jika ada file baru
      if (key !== "photo" || formData.value[key] instanceof File) {
        data.append(key, formData.value[key]);
      }
    }

    await axiosInstance.put(`/biodata/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // override default content-type
      },
    });

    alert("Biodata berhasil diperbarui!");
    router.push("/biodata");
  } catch (error) {
    console.error("Gagal update biodata:", error);
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
