<template>
  <!-- container utama dengan lebar maksimum, padding, background putih, bayangan, border bulat, dan margin atas -->
  <div class="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10">
    <!-- bagian atas: Judul dan tombol kembali -->
    <div class="flex items-center justify-between mb-4">
      <!-- judul halaman -->
      <Typography class="text-xl font-bold">Biodata Saya</Typography>

      <!-- tombol kembali ke halaman dashboard -->
      <RouterLink to="/dashboard">
        <ButtonAll class="flex items-center gap-2"> Back </ButtonAll>
      </RouterLink>
    </div>

    <!-- jika biodata berhasil didapatkan -->
    <div v-if="biodata" class="flex flex-col items-center">
      <!-- tampilkan foto jika ada -->
      <img
        v-if="biodata.photo"
        :src="biodata.photo"
        alt="Foto Profil"
        class="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mb-4"
      />
      <!-- tampilkan nama, email, alamat, dan nomor telepon -->
      <Typography class="font-semibold">{{ biodata.name }}</Typography>
      <p class="text-gray-600">Email: {{ biodata.email }}</p>
      <p class="text-gray-600">Alamat: {{ biodata.address }}</p>
      <p class="text-gray-600 pb-5">No Telepon: {{ biodata.phone }}</p>

      <!-- tombol untuk mengedit biodata -->
      <RouterLink :to="`/biodata/edit/${biodata.id}`">
        <ButtonAll class="bg-blue-500 hover:bg-blue-600"> Edit </ButtonAll>
      </RouterLink>
    </div>

    <!-- jika biodata tidak tersedia -->
    <div v-else class="text-center">
      <p class="text-gray-500">Biodata belum tersedia.</p>
      <!-- tombol untuk membuat biodata baru -->
      <RouterLink to="/biodata/create">
        <ButtonAll class="bg-green-500 hover:bg-green-600">
          Buat Biodata
        </ButtonAll>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// import ref dan lifecycle hook onMounted dari Vue
import {ref, onMounted} from "vue";

// import store autentikasi dan router
import {useAuthStore} from "@/store/auth";
import axiosInstance from "@/plugins/axiosInstance";
import {useRouter} from "vue-router";

// import komponen/element tombol dan typografi
import ButtonAll from "@/elements/ButtonAll.vue";
import Typography from "@/elements/Typography.vue";

// inisialisasi router dan authStore
const router = useRouter();
const authStore = useAuthStore();

// state untuk menyimpan data biodata
const biodata = ref(null);

// fungsi untuk mengambil data biodata dari API
const fetchBiodata = async () => {
  try {
    const res = await axiosInstance.get("/biodata"); // request GET ke endpoint /biodata
    biodata.value = res.data; // simpan hasil ke dalam variabel biodata
  } catch (error) {
    biodata.value = null; // jika error, kosongkan biodata
    console.error("Gagal mengambil biodata:", error); // tampilkan error di console
  }
};

// saat komponen dimount
onMounted(() => {
  // jika user belum login (tidak ada token), redirect ke halaman login
  if (!authStore.token) {
    router.push("/login");
  } else {
    // jika sudah login, ambil data biodata
    fetchBiodata();
  }
});
</script>

<style scoped></style>
