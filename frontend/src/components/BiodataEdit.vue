<template>
  <!-- wrapper utama form edit -->
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <!-- header form: Judul + tombol kembali -->
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-bold">Edit Biodata</Typography>
      <ButtonAll>
        <!-- kembali ke halaman list biodata -->
        <router-link to="/biodata">⬅ Back</router-link>
      </ButtonAll>
    </div>

    <!-- form untuk edit biodata -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- input Nama -->
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

      <!-- input Email -->
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

      <!-- input No Telepon -->
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

      <!-- input Alamat -->
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

      <!-- input untuk unggah foto -->
      <div class="mb-3">
        <Label>Upload Foto</Label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          @change="handleInputChange"
          class="input"
        />
        <!-- preview gambar jika ada -->
        <div v-if="photoPreview" class="mt-2">
          <img
            :src="photoPreview"
            alt="Preview"
            class="w-32 h-32 object-cover rounded"
          />
        </div>
      </div>

      <!-- tombol submit -->
      <ButtonAll type="submit" class="w-full bg-blue-500 hover:bg-blue-600">
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

// ambil ID dari parameter URL
const route = useRoute();
const router = useRouter();
const id = route.params.id;

// ambil store auth 
const authStore = useAuthStore();

// state form untuk menampung data input user
const formData = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  photo: null,
});

// untuk menampilkan preview gambar
const photoPreview = ref(null);

// saat komponen dimuat, ambil data biodata berdasarkan ID
onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/biodata/${id}`);
    // isi form dengan data yang sudah ada dari server
    formData.value = {
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      address: response.data.address,
      photo: null, // dikosongkan karena input file tidak bisa langsung di-set
    };

    // jika ada foto sebelumnya, tampilkan preview-nya
    if (response.data.photo) {
      photoPreview.value = response.data.photo;
    }
  } catch (error) {
    console.error("Gagal ambil biodata:", error);
  }
});

// fungsi untuk menangani perubahan input
const handleInputChange = (e) => {
  const {name, value, type, files} = e.target;

  // jika input adalah file (foto)
  if (type === "file") {
    const file = files[0];
    if (file) {
      formData.value.photo = file;
      // tampilkan preview gambar
      photoPreview.value = URL.createObjectURL(file);
    }
  } else {
    // jika bukan file, update state form biasa
    formData.value[name] = value;
  }
};

// fungsi untuk submit form ke server
const handleSubmit = async () => {
  try {
    const data = new FormData();
    for (const key in formData.value) {
      // hanya tambahkan file jika ada file baru
      if (key !== "photo" || formData.value[key] instanceof File) {
        data.append(key, formData.value[key]);
      }
    }

    // kirim data ke endpoint update
    await axiosInstance.put(`/biodata/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Biodata berhasil diperbarui!");
    // redirect ke halaman biodata
    router.push("/biodata");
  } catch (error) {
    console.error("Gagal update biodata:", error);
  }
};
</script>

<style scoped>
/* styling untuk input file */
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
