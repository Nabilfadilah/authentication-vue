<template>
  <!-- container utama -->
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <!-- header dengan judul dan tombol kembali -->
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-bold">Form Biodata</Typography>
      <ButtonAll>
        <router-link to="/biodata">⬅ Back</router-link>
      </ButtonAll>
    </div>

    <!-- form untuk input biodata -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- input Nama -->
      <div>
        <InputForm label="Nama" type="text" v-model="formData.name" required />
      </div>

      <!-- input Email -->
      <div>
        <InputForm
          label="Email"
          type="email"
          v-model="formData.email"
          required
        />
      </div>

      <!-- input No Telepon -->
      <div>
        <InputForm
          label="No Telepon"
          type="text"
          v-model="formData.phone"
          required
        />
      </div>

      <!-- input Alamat -->
      <div>
        <InputForm
          label="Alamat"
          type="text"
          v-model="formData.address"
          required
        />
      </div>

      <!-- upload Foto -->
      <div>
        <Label>Upload Foto</Label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="w-full p-2 border rounded-md"
        />

        <!-- preview foto jika sudah dipilih -->
        <div v-if="photoPreview" class="mt-3 flex justify-center">
          <img
            :src="photoPreview"
            alt="Preview"
            class="w-32 h-32 object-cover rounded-md shadow-md"
          />
        </div>
      </div>

      <!-- tombol Simpan -->
      <ButtonAll type="submit" class="w-full bg-blue-600 hover:bg-blue-700">
        Simpan
      </ButtonAll>
    </form>
  </div>
</template>

<script setup>
// import fitur dan komponen yang dibutuhkan
import {ref} from "vue";
import {useRouter} from "vue-router";
import axiosInstance from "@/plugins/axiosInstance"; // axios yang sudah dikonfigurasi
import Typography from "@/elements/Typography.vue";
import ButtonAll from "@/elements/ButtonAll.vue";
import InputForm from "@/elements/InputForm.vue";
import Label from "@/elements/Label.vue";

// inisialisasi router untuk navigasi
const router = useRouter();

// state untuk menyimpan data input form
const formData = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  photo: null, // file gambar
});

// untuk menampilkan preview gambar yang dipilih
const photoPreview = ref(null);

// fungsi saat file foto dipilih
const handleFileChange = (e) => {
  const file = e.target.files[0]; // ambil file pertama dari input
  if (file) {
    formData.value.photo = file; // simpan ke formData
    photoPreview.value = URL.createObjectURL(file); // buat preview dari file
  }
};

// fungsi saat form dikirim
const handleSubmit = async () => {
  try {
    const data = new FormData(); // gunakan FormData karena ada upload file

    // tambahkan semua field ke FormData (kecuali 'photo' karena diproses terpisah)
    Object.entries(formData.value).forEach(([key, value]) => {
      if (key !== "photo") {
        data.append(key, value);
      }
    });

    // validasi: pastikan foto berupa File
    if (!(formData.value.photo instanceof File)) {
      alert("Foto harus berupa file yang valid!");
      return;
    }

    // tambahkan file foto ke FormData
    data.append("photo", formData.value.photo);

    // kirim data ke endpoint /biodata/create
    const response = await axiosInstance.post("/biodata/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data); // log respons dari backend
    alert("Biodata berhasil dibuat!"); // notifikasi sukses
    router.push("/biodata"); // redirect ke halaman biodata list
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengirim data."); // notifikasi error
  }
};
</script>

<style scoped></style>
