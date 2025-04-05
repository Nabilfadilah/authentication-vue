<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-bold">Form Biodata</Typography>
      <ButtonAll>
        <router-link to="/biodata">⬅ Back</router-link>
      </ButtonAll>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <InputForm label="Nama" type="text" v-model="formData.name" required />
      </div>

      <div>
        <InputForm label="Email" type="email" v-model="formData.email" required />
      </div>

      <div>
        <InputForm label="No Telepon" type="text" v-model="formData.phone" required />
      </div>

      <div>
        <InputForm label="Alamat" type="text" v-model="formData.address" required />
      </div>

      <div>
        <Label>Upload Foto</Label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="w-full p-2 border rounded-md"
        />

        <div v-if="photoPreview" class="mt-3 flex justify-center">
          <img
            :src="photoPreview"
            alt="Preview"
            class="w-32 h-32 object-cover rounded-md shadow-md"
          />
        </div>
      </div>

      <ButtonAll
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700"
      >
        Simpan
      </ButtonAll>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import axiosInstance from "@/plugins/axiosInstance";
import Typography from "@/elements/Typography.vue";
import ButtonAll from "@/elements/ButtonAll.vue";
import InputForm from "@/elements/InputForm.vue";
import Label from "@/elements/Label.vue";

const router = useRouter();

const formData = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  photo: null,
});

const photoPreview = ref(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    formData.value.photo = file;
    photoPreview.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  try {
    const data = new FormData();
    Object.entries(formData.value).forEach(([key, value]) => {
      if (key !== "photo") {
        data.append(key, value);
      }
    });

    if (!(formData.value.photo instanceof File)) {
      alert("Foto harus berupa file yang valid!");
      return;
    }
    data.append("photo", formData.value.photo);

    const response = await axiosInstance.post("/biodata/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
    alert("Biodata berhasil dibuat!");
    router.push("/biodata");
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengirim data.");
  }
};
</script>

<style scoped>

</style>
