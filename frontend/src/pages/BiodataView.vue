<template>
  <div class="p-6 bg-white shadow-lg rounded-xl max-w-xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-3">
      <h2 class="text-2xl font-bold text-gray-800">📋 Biodata Saya</h2>
    </div>

    <!-- Jika biodata tersedia -->
    <div v-if="biodata" class="flex flex-col items-center text-center">
      <!-- Foto Profil -->
      <img
        v-if="biodata.photo"
        :src="biodata.photo"
        alt="Foto Profil"
        class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-sm mb-4"
      />

      <!-- Informasi -->
      <h3 class="text-xl font-semibold text-gray-900">{{ biodata.name }}</h3>
      <p class="text-gray-600 mt-1">📧 {{ biodata.email }}</p>
      <p class="text-gray-600">🏠 {{ biodata.address }}</p>
      <p class="text-gray-600 mb-5">📞 {{ biodata.phone }}</p>

      <!-- Tombol Edit -->
      <RouterLink :to="`/biodata/edit/${biodata.id}`">
        <ButtonAll class="bg-indigo-600 hover:bg-indigo-700 transition">
          ✏️ Edit Biodata
        </ButtonAll>
      </RouterLink>
    </div>

    <!-- Jika tidak ada biodata -->
    <div v-else class="text-center text-gray-500 space-y-4">
      <p>Biodata belum tersedia.</p>
      <RouterLink to="/biodata/create">
        <ButtonAll class="bg-green-600 hover:bg-green-700 transition">
          ➕ Buat Biodata
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
